import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PacienteService } from '../services/paciente.service';
import { CriarPacienteDTO } from '../dtos/paciente.dto';
import { AppException } from '../common/exceptions/app.exception';
import { logger } from '../utils/logger';

const service = new PacienteService();

export const criarPaciente = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarPacienteDTO, req.body);

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novoPaciente = await service.criar(dto);
    return res.status(201).json(novoPaciente);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};

export const inativarPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await service.inativar(parseInt(id));
    return res.status(204).send();
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const ativarPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await service.ativar(parseInt(id));
    return res.status(204).send();
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const listarPacientes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const nome = req.query.nome as string;
    const cpf = req.query.cpf as string;
    const email = req.query.email as string;
    const filtros: any = {};
    if (nome) filtros.nome = { contains: nome};
    if (cpf) filtros.cpf = { startsWith: cpf};
    if(email) filtros.email = { startsWith: email };
    const pacientes = await service.listarPacientes(page, limit, filtros);
    return res.status(200).json(pacientes);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const buscarPacientePorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const paciente = await service.buscarPacientePorId(parseInt(id));
    return res.status(200).send(paciente);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const atualizarDadosPaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = plainToInstance(CriarPacienteDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const pacienteAtualizado = await service.atualizar(parseInt(id), dto);
    return res.status(200).json(pacienteAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

