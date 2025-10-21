import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { DiagnosticoService } from '../services/diagnostico.service';
import { CriarDiagnosticoDTO } from '../dtos/diagnostico.dto';
import { logger } from '../utils/logger';

const service = new DiagnosticoService();

export const criarDiagnostico = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarDiagnosticoDTO, req.body);
    const { consulta_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        const novoDiagnostico = await service.criar(parseInt(consulta_id), dto);
        return res.status(201).json(novoDiagnostico);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const atualizarDiagnostico = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarDiagnosticoDTO, req.body);
    const { consulta_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        const novoDiagnostico = await service.atualizar(parseInt(consulta_id), dto);
        return res.status(200).json(novoDiagnostico);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


export const buscarDiagnosticoPorConsultaId = async (req: Request, res: Response) => {
  try {
    const { consulta_id } = req.params
    const diagnosticoAtualizado = await service.buscarDiagnosticoPorConsultaId(parseInt(consulta_id));
    return res.status(200).send(diagnosticoAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}