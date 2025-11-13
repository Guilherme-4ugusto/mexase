import { PrismaClient } from '@prisma/client';
import { CriarRecordatorioDTO } from '../dtos/recordatorio.dto';
import { AppException } from '../common/exceptions/app.exception';

const prisma = new PrismaClient();

export class RecordatorioService {

  /**
   * Cria múltiplos recordatórios para uma consulta.
   */
  async criarVarios(consultaId: number, dtos: CriarRecordatorioDTO[]) {
    // Verifica se a consulta existe
    const consulta = await prisma.consulta.findUnique({
      where: { id: consultaId },
    });

    if (!consulta) {
      throw new AppException('Consulta não encontrada.', 404);
    }

    // Transação para garantir consistência (tudo ou nada)
    return await prisma.$transaction(async (tx) => {
      const recordatoriosCriados = [];

      for (const dto of dtos) {
        const recordatorio = await tx.recordatorio.create({
          data: {
            tipo_refeicao: dto.tipo_refeicao,
            horario_refeicao: dto.horario_refeicao,
            frequencia: dto.frequencia,
            observacao: dto.observacao,
            alimentos_consumidos: dto.alimentos_consumidos,
            dia_semana: dto.dia_semana,
            consulta_id: consultaId,
          },
        });

        if (dto.grupos_alimentares_ids?.length) {
          await tx.recordatorioGrupo.createMany({
            data: dto.grupos_alimentares_ids.map((id) => ({
              id_recordatorio: recordatorio.id,
              id_grupo_alimentar: id,
            })),
          });
        }

        const recordatorioCompleto = await tx.recordatorio.findUnique({
          where: { id: recordatorio.id },
          include: {
            grupos: { include: { grupo_alimentar: true } },
          },
        });

        recordatoriosCriados.push(recordatorioCompleto);
      }

      return recordatoriosCriados;
    });
  }

  /**
   * Atualiza múltiplos recordatórios (se necessário).
   * Pode ser implementado no futuro.
   */
  async atualizarVarios(consulta_id: number, dtos: CriarRecordatorioDTO[]) {
    const recordatorio = await prisma.recordatorio.findFirst({
      where: { consulta_id },
    })
    // Estratégia: apagar os existentes e recriar todos.
    try {
      await prisma.recordatorioGrupo.deleteMany({
        where: { id_recordatorio: recordatorio?.id },
      })
    } catch {
    }

    try {
      await prisma.recordatorio.deleteMany({
        where: { consulta_id },
      });
    } catch {
    }

    return this.criarVarios(consulta_id, dtos);
  }

  /**
   * Busca todos os recordatórios de uma consulta.
   */
  async buscarPorConsultaId(consultaId: number) {
    const recordatorios = await prisma.recordatorio.findMany({
      where: { consulta_id: consultaId },
      include: {
        grupos: { include: { grupo_alimentar: true } },
      },
    });

    if (!recordatorios.length) {
      throw new AppException('Nenhum recordatório encontrado para esta consulta.', 404);
    }

    return recordatorios;
  }
}
