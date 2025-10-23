import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { ClassificacaoService } from '../services/classificacao.service';
import { CriarClassificacaoDTO } from '../dtos/classificacao.dto';
import { logger } from '../utils/logger';

const service = new ClassificacaoService();

export const criarClassificacao = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarClassificacaoDTO, req.body);
  const { consulta_id } = req.params

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novaClassificao = await service.criar(parseInt(consulta_id), dto);
    return res.status(201).json(novaClassificao);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};

export const buscarClassificacoesPorConsultaId = async (req: Request, res: Response) => {
 try {
    const { consulta_id } = req.params
    const classificacoes = await service.buscarClassificacoesPorConsultaId(parseInt(consulta_id));
    return res.status(200).send(classificacoes);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const atualizarClassificao = async (req: Request, res: Response) => {
  const { classificacao_id } = req.params
  const dto = plainToInstance(CriarClassificacaoDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const classificacaoAtualizada = await service.atualizar(parseInt(classificacao_id), dto);
    return res.status(200).json(classificacaoAtualizada);
  } catch (error: any) {
    logger.error(error);
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
