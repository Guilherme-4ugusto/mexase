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

  async listarPacientes(page: number, limit: number, filtros: any) {

    const pacientes = await prisma.paciente.findMany({
      where: {
        ...filtros,
        desativadoEm: null,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { nome: 'asc' },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        data_nascimento: true,
        telefone: true,
        
        sexo: true,
        naturalidade: true,
        criadoEm: true,
        desativadoEm: true,
        setor: {
          select: {
            nome: true,
          },
        },
      },
    });


    const totalItems = Object.keys(filtros).length > 0 ? await prisma.paciente.count({ where: { ...filtros } }) : await prisma.paciente.count({ where: { desativadoEm: null }, });

    const totalPages = Math.ceil(totalItems / limit);

    const pacientesComNomeSetor = pacientes.map(p => ({
      ...p,
      nome_setor: p.setor.nome,
      setor: undefined,
    }));

    return {
      data: pacientesComNomeSetor,
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

  async totalPacientesPorGenero(filtros: any) {
    const resultado = await prisma.paciente.groupBy({
      by: ['sexo'],
      where: {
        ...filtros,
        desativadoEm: null,
      },
      _count: { _all: true },
    });

    const campos: Record<'M' | 'F' | 'O', string> = {
      M: 'Masculino',
      F: 'Feminino',
      O: 'Outro',
    };

    const base: Record<'M' | 'F' | 'O', number> = { M: 0, F: 0, O: 0 };

    for (const item of resultado) {
      const sexo = (item.sexo ?? 'O') as 'M' | 'F' | 'O';
      base[sexo] = item._count._all;
    }

    return [
      { genero: campos.F, total: base.F },
      { genero: campos.M, total: base.M },
      { genero: campos.O, total: base.O },
    ];
  }

  async totalPacientesPorSetor() {
    const resultado = await prisma.paciente.groupBy({
        by: ["cd_setor"],
        _count: { id: true },
      })

      const setores = await prisma.setor.findMany({
        select: { cd_setor: true, nome: true },
      })

      const dados = setores.map((setor) => {
        const item = resultado.find((r) => r.cd_setor === setor.cd_setor)
        return {
          setor: setor.nome,
          total: item?._count.id ?? 0,
        }
      })

      return dados
  }
}

