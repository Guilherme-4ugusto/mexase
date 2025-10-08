import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PacienteService } from '../services/paciente.service';
import { CriarPacienteDTO } from '../dtos/paciente.dto';

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
    if (error.message === 'Paciente já cadastrado!') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

};

