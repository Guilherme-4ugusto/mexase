import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NutricionistaService } from '../services/nutricionista.service';
import { AlterarSenhaNutricionistaDTO, CriarNutricionistaDTO } from '../dtos/nutricionista.dto';
import { logger } from '../utils/logger';

const service = new NutricionistaService();

export const criarNutricionista = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarNutricionistaDTO, req.body);

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();

    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novoNutricionista = await service.criar(dto);
    return res.status(201).json(novoNutricionista);
  } catch (error: any) {
    logger.error(error);
    if (error.message === 'Email ou matricula já cadastrado') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const inativarNutricionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await service.inativar(parseInt(id));
        return res.status(204).send();
    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const reativarNutricionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await service.reativar(parseInt(id));
        return res.status(204).send();
    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const atualizarDadosNutricionista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = plainToInstance(CriarNutricionistaDTO, req.body);

  const erros = await validate(dto, { skipMissingProperties: true });

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const nutricionistaAtualizado = await service.atualizar(parseInt(id), dto);
    return res.status(200).json(nutricionistaAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error.message === 'Nutricionista não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Email ou matrícula já cadastrados por outro nutricionista') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const buscarNutricionista = async (req: Request, res: Response) => {
  try{
    const { id } = req.params
    const nutricionistas = await service.buscar(parseInt(id));
    return res.status(200).json(nutricionistas);
  } catch (error: any) {
    logger.error(error);
    if(error.message == 'Nutricionista não encontrado'){
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const buscarNutricionistas = async (req: Request, res: Response) => {
  try{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const nome = req.query.nome as string;
    const matricula = parseInt(req.query.matricula as string);
    const email = req.query.email as string;
    const filtros: any = {};
    if (nome) filtros.nome = { contains: nome};
    if (matricula) filtros.matricula = matricula;
    if(email) filtros.email = { startsWith: email };

    const nutricionistas = await service.buscarTodos(page, limit, filtros);
    return res.status(200).json(nutricionistas);
  } catch (error: any) {
    logger.error(error);
    if(error.message == 'Nenhum nutricionista encontrado'){
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const alterarSenhaNutricionista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = plainToInstance(AlterarSenhaNutricionistaDTO, req.body);

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const nutricionistaAtualizado = await service.alterarSenha(parseInt(id), dto);
    return res.status(200).json(nutricionistaAtualizado);
  } catch (error: any) {
    logger.error(error);
    if (error.message === 'Nutricionista não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const alterarTemaDoNutricionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await service.alterarTema(parseInt(id));
        return res.status(204).send();
    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}