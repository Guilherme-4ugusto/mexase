import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConsultaService } from '../services/consulta.service';
import { CriarConsultaDTO } from '../dtos/consulta.dto';
import { logger } from '../utils/logger';
import { AppException } from '../common/exceptions/app.exception';

const service = new ConsultaService();

export const criarConsulta = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarConsultaDTO, req.body);

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }
    const tokenPayload = res.locals.token as any;
    const nutriId = tokenPayload.id;

    try {
        const novaConsulta = await service.criar(parseInt(nutriId), dto);
        return res.status(201).json(novaConsulta);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const atualizarConsultaPorIdConsulta = async (req: Request, res: Response) => {
    const dto = plainToInstance(CriarConsultaDTO, req.body);
    const { consulta_id } = req.params

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();
        return res.status(400).json({ errors: mensagens });
    }

    try {
        const consultaAtualizada = await service.atualizar(parseInt(consulta_id), dto);
        return res.status(200).json(consultaAtualizada);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const buscarConsultaPorIdConsulta = async (req: Request, res: Response) => {
    try {
        const { consulta_id } = req.params;
        const consultaCompleta = req.query.consultaCompleta === 'true';
        const consulta = consultaCompleta
            ? await service.buscarConsultaCompleta(parseInt(consulta_id))
            : await service.buscarConsulta(parseInt(consulta_id));
        return res.status(200).json(consulta);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const buscarConsultasPorIdPaciente = async (req: Request, res: Response) => {
    try {
        const { paciente_id } = req.params;
        const consultaCompleta = req.query.consultaCompleta === 'true';
        const consulta = consultaCompleta
            ? await service.buscarConsultaPorPacienteCompleta(parseInt(paciente_id))
            : await service.buscarConsultaPorPaciente(parseInt(paciente_id));
        return res.status(200).json(consulta);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const buscarConsultasPorIdNutri = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const consultaCompleta = req.query.consultaCompleta === 'true';
        const consulta = consultaCompleta
            ? await service.buscarConsultaPorNutriCompleta(parseInt(id))
            : await service.buscarConsultaPorNutri(parseInt(id));
        return res.status(200).json(consulta);
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
