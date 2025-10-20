import { prisma } from '../prisma/client';
import { CriarRecordatorioDTO } from "../dtos/recordatorio.dto";
import { ConsultaNaoEncontradoException } from '../common/exceptions/consulta/consulta_nao_encontrado.exception';
import { RecordatorioNaoEncontradoException } from '../common/exceptions/recordatorio/recordatorio_nao_encontrado.exception';
import { GrupoAlimentarNaoEncontradoException } from '../common/exceptions/grupo_alimentar/grupo_alimentar_nao_encontrado.exception';


export class RecordatorioService {

    async criar(
        consulta_id: number,
        {
            frequencia,
            horario_refeicao,
            id_grupo_alimentar,
            observacao
        }:CriarRecordatorioDTO 

    ){

        const consulta = await prisma.consulta.findUnique({
            where : {id : consulta_id}
        })

        if(!consulta){
            throw new ConsultaNaoEncontradoException();
        }

        const grupoAlimento = await prisma.grupoAlimentar.findFirst({
            where : {id : id_grupo_alimentar}
        })

        if(!grupoAlimento){
            throw new GrupoAlimentarNaoEncontradoException();
        }

        return await prisma.recordatorio.create({
            data: {
                consulta_id,
                frequencia,
                horario_refeicao,
                id_grupo_alimentar,
                observacao
            },
        });

    }

    async atualizar(
        consulta_id: number,
        {
            frequencia,
            horario_refeicao,
            id_grupo_alimentar,
            observacao
        }:CriarRecordatorioDTO 

    ){

        const consulta = await prisma.consulta.findUnique({
            where : {id : consulta_id}
        })

        if(!consulta){
            throw new RecordatorioNaoEncontradoException();
        }

        const grupoAlimento = await prisma.grupoAlimentar.findFirst({
            where : {id : id_grupo_alimentar}
        })

        if(!grupoAlimento){
            throw new GrupoAlimentarNaoEncontradoException();
        }

        return await prisma.recordatorio.update({
            where: { consulta_id },
            data: {
                frequencia,
                horario_refeicao,
                id_grupo_alimentar,
                observacao
            },
        });
    }


    async buscarRecordatorioPorConsultaId(consulta_id: number) {
        const recordatorio = await prisma.recordatorio.findUnique({
            where: { consulta_id },
        });
        if(!recordatorio){
            throw new RecordatorioNaoEncontradoException();
        }
        return recordatorio;
    }
    
}
