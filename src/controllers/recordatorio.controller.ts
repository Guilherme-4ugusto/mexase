import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { RecordatorioService } from '../services/recordatorio.service';
import { CriarRecordatorioDTO } from '../dtos/recordatorio.dto';
import { logger } from '../utils/logger';

const service = new RecordatorioService();

/**
 * Cria um ou mais recordatórios para uma consulta.
 * O corpo pode ser um único objeto ou uma lista de objetos.
 */
export const criarRecordatorio = async (req: Request, res: Response) => {
  const { consulta_id } = req.params;
  const body = req.body;

  // Garante que é um array
  const lista = Array.isArray(body) ? body : [body];
  const dtos: CriarRecordatorioDTO[] = [];

  // Validação individual de cada item
  for (const item of lista) {
    const dto = plainToInstance(CriarRecordatorioDTO, item);
    const erros = await validate(dto);
    if (erros.length > 0) {
      const mensagens = erros.map((e) => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ errors: mensagens });
    }
    dtos.push(dto);
  }

  try {
    // Usa o novo método criarVarios() no service
    const novosRecordatorios = await service.criarVarios(parseInt(consulta_id), dtos);
    return res.status(201).json(novosRecordatorios);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Atualiza todos os recordatórios de uma consulta.
 * Estratégia: apaga os existentes e recria todos.
 */
export const atualizarRecordatorio = async (req: Request, res: Response) => {
  const { consulta_id } = req.params;
  const body = req.body;

  const lista = Array.isArray(body) ? body : [body];
  const dtos: CriarRecordatorioDTO[] = [];

  for (const item of lista) {
    const dto = plainToInstance(CriarRecordatorioDTO, item);
    const erros = await validate(dto);
    if (erros.length > 0) {
      const mensagens = erros.map((e) => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ errors: mensagens });
    }
    dtos.push(dto);
  }

  try {
    const recordatoriosAtualizados = await service.atualizarVarios(parseInt(consulta_id), dtos);
    return res.status(200).json(recordatoriosAtualizados);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Busca todos os recordatórios de uma consulta.
 */
export const buscarRecordatorioPorConsultaId = async (req: Request, res: Response) => {
  try {
    const { consulta_id } = req.params;
    const recordatorios = await service.buscarPorConsultaId(parseInt(consulta_id));
    return res.status(200).json(recordatorios);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
