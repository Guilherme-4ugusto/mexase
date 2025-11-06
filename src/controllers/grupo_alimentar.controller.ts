import { Request, Response } from 'express';
import { GrupoAlimentarService } from '../services/grupo_alimentar.service';
import { logger } from '../utils/logger';

const service = new GrupoAlimentarService();


export const listarGrupoAlimentar = async (req: Request, res: Response) => {
  try {
    const grupoAlimentar = await service.listarGrupoAlimentar();
    return res.status(200).json(grupoAlimentar);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};