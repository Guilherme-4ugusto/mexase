import { Request, Response } from 'express';
import { CriarHistoricoFamiliarDTO } from "../dtos/historico_familiar.dto";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { HistoricoFamiliarService } from '../services/historico_familiar.service';
import { AppException } from '../common/exceptions/app.exception';
import { logger } from '../utils/logger';

const service = new HistoricoFamiliarService();

export const criarHistoricoFamiliar = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarHistoricoFamiliarDTO, req.body);
    const { paciente_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        await service.criar(parseInt(paciente_id), dto);
        return res.status(201).send();
    } catch (error : any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }

};

export const atualizarHistoricoFamiliar = async (req: Request, res: Response) => {
  const { paciente_id } = req.params;
  const dto = plainToInstance(CriarHistoricoFamiliarDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    await service.atualizar(parseInt(paciente_id), dto);
    return res.status(200).send();
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const buscarHistoricoFamiliarPorPacienteId = async (req: Request, res: Response) => {
  try {
    const { paciente_id } = req.params
    const historicoFamiliar = await service.buscarHistoricoFamiliarPorPacienteId(parseInt(paciente_id));
    return res.status(200).send(historicoFamiliar);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
