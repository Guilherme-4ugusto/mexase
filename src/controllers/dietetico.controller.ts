import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DieteticoService } from '../services/dietetico.service';
import { AppException } from '../common/exceptions/app.exception';
import { CriarDadosDieteticosDTO } from '../dtos/dados_dieteticos_dto';
import { logger } from '../utils/logger';

const service = new DieteticoService();

export const criarDadosDietetico = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarDadosDieteticosDTO, req.body);
  const { paciente_id } = req.params

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novoDietetico = await service.criar(parseInt(paciente_id), dto);
    return res.status(201).json(novoDietetico);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};


export const buscarDieteticosPorPacienteId = async (req: Request, res: Response) => {
  try {
    const { paciente_id } = req.params
    const dietetico = await service.buscarDieteticosPorPacienteId(parseInt(paciente_id));
    return res.status(200).send(dietetico);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const atualizarDadosDieteticosPaciente = async (req: Request, res: Response) => {
  const { paciente_id } = req.params;
  const dto = plainToInstance(CriarDadosDieteticosDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const dieteticoAtualizado = await service.atualizar(parseInt(paciente_id), dto);
    return res.status(200).json(dieteticoAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

