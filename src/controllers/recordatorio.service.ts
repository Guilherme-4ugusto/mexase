import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppException } from '../common/exceptions/app.exception';
import { RecordatorioService } from '../services/recordatorio.service';
import { CriarRecordatorioDTO } from '../dtos/recordatorio.dto';

const service = new RecordatorioService();

export const criarRecordatorio = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarRecordatorioDTO, req.body);
    const { consulta_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        const novoRecordatorio = await service.criar(parseInt(consulta_id), dto);
        return res.status(201).json(novoRecordatorio);
    } catch (error: any) {
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const atualizarRecordatorio = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarRecordatorioDTO, req.body);
    const { consulta_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        const novoRecordatorio = await service.atualizar(parseInt(consulta_id), dto);
        return res.status(201).json(novoRecordatorio);
    } catch (error: any) {
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


export const buscarRecordatorioPorConsultaId = async (req: Request, res: Response) => {
  try {
    const { consulta_id } = req.params
    const recordatorioAtualizado = await service.buscarRecordatorioPorConsultaId(parseInt(consulta_id));
    return res.status(200).send(recordatorioAtualizado);
  } catch (error: any) {
    if (error instanceof AppException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}