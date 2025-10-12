import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { EstiloVidaService } from '../services/estilo_vida.service';
import { CriarEstilosVidaDTO } from '../dtos/estilo_vida.dto';

const service = new EstiloVidaService();

export const criarEstiloVida = async (req: Request, res: Response) => {
  const dto = plainToInstance(CriarEstilosVidaDTO, req.body);
  const { paciente_id } = req.params

  const erros = await validate(dto);

  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const novoEstiloVida = await service.criar(parseInt(paciente_id), dto);
    return res.status(201).json(novoEstiloVida);
  } catch (error: any) {
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};


export const buscarEstiloVidaPorPacienteId = async (req: Request, res: Response) => {
  try {
    const { paciente_id } = req.params
    const estiloVida = await service.buscarEstiloVidaPorPacienteId(parseInt(paciente_id));
    return res.status(200).send(estiloVida);
  } catch (error: any) {
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export const atualizarDadosEstiloVidaPaciente = async (req: Request, res: Response) => {
  const { paciente_id } = req.params;
  const dto = plainToInstance(CriarEstilosVidaDTO, req.body);

  const erros = await validate(dto);
  if (erros.length > 0) {
    const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
    return res.status(400).json({ errors: mensagens });
  }

  try {
    const estiloVidaAtualizado = await service.atualizar(parseInt(paciente_id), dto);
    return res.status(200).json(estiloVidaAtualizado);
  } catch (error: any) {
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
