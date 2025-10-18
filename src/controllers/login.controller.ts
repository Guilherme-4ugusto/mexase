import { Request, Response } from 'express';
import { RealizarLoginDTO } from '../dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from '../services/login.service';
import { logger } from '../utils/logger';

const service = new AuthService();

export const realizarLogin = async  (req: Request, res: Response) => {
    const dto = plainToInstance(RealizarLoginDTO, req.body);

    const erros = await validate(dto);

    if (erros.length > 0) {
        const mensagens = erros.map(e => Object.values(e.constraints || {})).flat();

        return res.status(400).json({ errors: mensagens });
    }

    try {
        const token = await service.realizarLogin(dto);
        return res.status(201).json(token);
    } catch (error: any) {
        logger.error(error);
        if (error.message === 'Email ou senha incorretos. Tente novamente.') {
            return res.status(401).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}