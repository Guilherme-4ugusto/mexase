import { prisma } from '../prisma/client';
import { CriarDadosDieteticosDTO } from '../dtos/dados_dieteticos_dto';
import { PacienteNaoEncontradoException } from '../common/exceptions/paciente/paciente_nao_encontrado.exception';
import { DieteticoJaCadastradoException } from '../common/exceptions/dietetico/dietetico_ja_cadastrado.exception';
import { DieteticoNaoEncontradoException } from '../common/exceptions/dietetico/dietetico_nao_encontrado.exception';

export class DieteticoService {
  async criar(paciente_id: number, { aversao_alimentos, preferencia_alimentos, alergia_alimentos }: CriarDadosDieteticosDTO) {
    const paciente = await prisma.paciente.findUnique({
      where: { id: paciente_id },
    });

    if (!paciente) throw new PacienteNaoEncontradoException();

    const dadosExistentes = await prisma.dadosDieteticos.findUnique({
      where: { paciente_id },
    });

    if (dadosExistentes) throw new DieteticoJaCadastradoException();

    return await prisma.dadosDieteticos.create({
      data: {
        aversao_alimentos,
        preferencia_alimentos,
        alergia_alimentos,
        paciente_id,
      },
    });
  }

  async atualizar(paciente_id: number, { aversao_alimentos, preferencia_alimentos, alergia_alimentos }: CriarDadosDieteticosDTO) {
    
    const paciente = await prisma.paciente.findUnique({
      where: { id: paciente_id },
    });

    if (!paciente) throw new PacienteNaoEncontradoException();

    const dadosExistentes = await prisma.dadosDieteticos.findUnique({
      where: { paciente_id },
    });
    
    if (!dadosExistentes) throw new DieteticoNaoEncontradoException();

    return await prisma.dadosDieteticos.update({
      where: { paciente_id },
      data: {
        aversao_alimentos,
        preferencia_alimentos,
        alergia_alimentos,
      },
    });
  }

  async buscarDieteticosPorPacienteId(paciente_id: number) {
    const dadosDieteticos = await prisma.dadosDieteticos.findUnique({
      where: { paciente_id },
    });
    return dadosDieteticos;
  }
}
