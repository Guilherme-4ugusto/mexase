import { prisma } from '../prisma/client';
import { CriarPacienteDTO } from '../dtos/paciente.dto';
import { PacienteNaoEncontradoException } from '../common/exceptions/paciente/paciente_nao_encontrado.exception';
import { PacienteJaCadastradoException } from '../common/exceptions/paciente/paciente_ja_cadastrado.exception';
import { PacienteJaInativadoException } from '../common/exceptions/paciente/paciente_ja_inativado.exception';
import { PacienteInativoException } from '../common/exceptions/paciente/paciente_inativo.exception';
import { PacienteJaAtivadoException } from '../common/exceptions/paciente/paciente_ja_ativado.exception';

export class PacienteService {
  async criar({ nome, email, cpf, data_nascimento, naturalidade, sexo, telefone, cd_setor }: CriarPacienteDTO) {
    const existe = await prisma.paciente.findFirst({
      where: { cpf },
    });

    if (existe) throw new PacienteJaCadastradoException();

    const novo = await prisma.paciente.create({
      data: {
        cpf,
        nome,
        email,
        data_nascimento: new Date(data_nascimento),
        naturalidade,
        sexo,
        telefone,
        cd_setor
      },
    });

    return novo;
  }

  async inativar(id: number) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) throw new PacienteNaoEncontradoException();
    if (paciente.desativadoEm) throw new PacienteJaInativadoException();
    await prisma.paciente.update({
      where: {
        id,
      },
      data: {
        desativadoEm: new Date(),
      },
    });
    return
  }

  async ativar(id: number) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) throw new PacienteNaoEncontradoException();
    if (!paciente.desativadoEm) throw new PacienteJaAtivadoException();
    await prisma.paciente.update({
      where: {
        id,
      },
      data: {
        desativadoEm: null,
      },
    });
    return
  }

  async listarPacientes(page: number, limit: number) {
    const totalItems = await prisma.paciente.count({
      where: { desativadoEm: null },
    });

    const pacientes = await prisma.paciente.findMany({
      where: {
        desativadoEm: null,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { nome: 'asc' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: pacientes,
      meta: {
        totalItems,
        totalPages,
        page,
        limit,
      },
    };
  }


  async buscarPacientePorId(id: number) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) throw new PacienteJaCadastradoException();
    if (paciente.desativadoEm) throw new PacienteInativoException();
    return paciente;
  }

  async atualizar(id: number, { nome, email, cpf, data_nascimento, naturalidade, sexo, telefone, cd_setor }: CriarPacienteDTO) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) throw new PacienteNaoEncontradoException();

    if (cpf && cpf !== paciente.cpf) {
      const cpfExistente = await prisma.paciente.findFirst({
        where: { cpf },
      });
      if (cpfExistente) throw new PacienteJaCadastradoException();
    }

    const atualizado = await prisma.paciente.update({
      where: { id },
      data: {
        nome,
        email,
        cpf,
        data_nascimento: new Date(data_nascimento),
        naturalidade,
        sexo,
        telefone,
        cd_setor
      },
    });

    return atualizado;
  }
}


