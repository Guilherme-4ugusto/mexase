import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NutricionistaService } from '../services/nutricionista.service';
import { CriarNutricionistaDTO } from '../dtos/nutricionista.dto';

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
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const reativarNutricionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await service.reativar(parseInt(id));
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const atualizarDadosNutricionista = async (req: Request, res: Response) => {
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
    if (error.message === 'Email ou matricula já cadastrado') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};