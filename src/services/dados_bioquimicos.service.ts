import { ConsultaNaoEncontradoException } from "../common/exceptions/consulta/consulta_nao_encontrado.exception";
import { CriarDadosBioquimicosDTO } from "../dtos/dados_bioquicos.dto";
import { prisma } from '../prisma/client';
import { DadosBioquimicosNaoEncontradosException } from "../common/exceptions/dados_bioquimicos/dados_bioquimicos.exception";

export class DadosBioquimicosService {

    async criar(consulta_id: number, { hemoglobina, hematocrito }: CriarDadosBioquimicosDTO) {

        const consulta = await prisma.consulta.findUnique({
                where: { id: consulta_id }
            })
    
        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

         return await prisma.dadosBioquimicos.create({
            data: {
                consulta_id,
                hemoglobina,
                hematocrito
            },
        });
    
    }

    async atualizar(consulta_id: number, { hemoglobina, hematocrito }: CriarDadosBioquimicosDTO){

        const dados_bioquicos = await prisma.dadosBioquimicos.findUnique({
            where: { consulta_id: consulta_id }
        })

        if (!dados_bioquicos) {
            throw new DadosBioquimicosNaoEncontradosException();
        }

        return await prisma.dadosBioquimicos.update({
            where: { consulta_id },
            data: {
                hemoglobina,
                hematocrito
            },
        });
    }

    async buscarDadosBioquimicosPorConsultaId(consulta_id: number) {
        const dados_bioquicos = await prisma.dadosBioquimicos.findUnique({
            where: { consulta_id },
        });
        if (!dados_bioquicos) {
            throw new DadosBioquimicosNaoEncontradosException();
        }
        return dados_bioquicos;
    }
}    