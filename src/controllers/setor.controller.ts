import { Request, Response } from 'express';
import { SetorService } from '../services/setor.service';
import { logger } from '../utils/logger';

const service = new SetorService();


export const listarSetores = async (req: Request, res: Response) => {
  try {
    const setores = await service.listarSetores();
    return res.status(200).json(setores);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};