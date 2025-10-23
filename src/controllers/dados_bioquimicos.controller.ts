import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { DadosBioquimicosService } from '../services/dados_bioquimicos.service';
import { CriarDadosBioquimicosDTO } from '../dtos/dados_bioquicos.dto';
import { logger } from '../utils/logger';

const service = new DadosBioquimicosService();

export const criarDadosBioquimicos = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarDadosBioquimicosDTO, req.body);
  const { consulta_id } = req.params

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novoDadosBioquimicos = await service.criar(parseInt(consulta_id), dto);
    return res.status(201).json(novoDadosBioquimicos);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};

export const buscarDadosBioquimicosPorConsultaId = async (req: Request, res: Response) => {
 try {
    const { consulta_id } = req.params
    const dadosBioquimicosAtualizado = await service.buscarDadosBioquimicosPorConsultaId(parseInt(consulta_id));
    return res.status(200).send(dadosBioquimicosAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const atualizarDadosBioquimicos = async (req: Request, res: Response) => {
  const { consulta_id } = req.params
  const dto = plainToInstance(CriarDadosBioquimicosDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const dadosBioquimicosAtualizado = await service.atualizar(parseInt(consulta_id), dto);
    return res.status(200).json(dadosBioquimicosAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
