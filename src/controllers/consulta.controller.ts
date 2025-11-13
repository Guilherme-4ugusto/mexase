import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConsultaService } from '../services/consulta.service';
import { CriarConsultaDTO } from '../dtos/consulta.dto';
import { logger } from '../utils/logger';
import { AppException } from '../common/exceptions/app.exception';
import { CriarConsultaCompletaDTO } from '../dtos/consulta_completa.dto';
import { RecordatorioService } from '../services/recordatorio.service';
import { DadosBioquimicosService } from '../services/dados_bioquimicos.service';
import { ClassificacaoService } from '../services/classificacao.service';
import { DiagnosticoService } from '../services/diagnostico.service';
import { HistoricoFamiliarService } from '../services/historico_familiar.service';
import { DieteticoService } from '../services/dietetico.service';
import { EstiloVidaService } from '../services/estilo_vida.service';

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

export const criarConsultaCompleta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pacienteId = parseInt(id);
        const dto = plainToInstance(CriarConsultaCompletaDTO, req.body);
        const tokenPayload = res.locals.token as any;
        const nutriId = tokenPayload.id;
        //Cria consulta base
        const consulta = await service.criar(nutriId, dto.consultaBase);

        //Cria os demais campos
        new RecordatorioService().criarVarios(consulta.id, dto.recordatorio)
        new DadosBioquimicosService().criar(consulta.id, dto.dados_bioquimicos)
        new ClassificacaoService().criarVarias(consulta.id, dto.classificacao)
        new DiagnosticoService().criar(consulta.id, dto.diagnostico)

        const historico = new HistoricoFamiliarService().buscarHistoricoFamiliarPorPacienteId(pacienteId);


        //Verificar se o objeto não veio vazio
        if (historico == null) {
            new HistoricoFamiliarService().criar(pacienteId, dto.historicoFamiliar)
            new DieteticoService().criar(pacienteId, dto.dadosDieteticos)
            new EstiloVidaService().criar(pacienteId, dto.estiloVida)
        }

        return res.status(201).send();
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }


}



export const atualizarConsultaPorIdConsulta = async (req: Request, res: Response) => {
    try {
        const { consulta_id } = req.params;
        const consultaId = parseInt(consulta_id);
        const dto = plainToInstance(CriarConsultaCompletaDTO, req.body);
        console.log(dto)
        //Cria consulta base
        service.atualizar(consultaId, dto.consultaBase);

        //Cria os demais campos
        new RecordatorioService().atualizarVarios(consultaId, dto.recordatorio)
        new DadosBioquimicosService().atualizar(consultaId, dto.dados_bioquimicos)
        new ClassificacaoService().atualizarVarias(consultaId, dto.classificacao)
        new DiagnosticoService().atualizar(consultaId, dto.diagnostico)

        return res.status(201).send();
    } catch (error: any) {
        logger.error(error);
        if (error instanceof AppException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
