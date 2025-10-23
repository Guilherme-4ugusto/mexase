import { ConsultaNaoEncontradoException } from "../common/exceptions/consulta/consulta_nao_encontrado.exception";
import { CriarClassificacaoDTO } from "../dtos/classificacao.dto";
import { prisma } from '../prisma/client';
import { ClassificacaoNaoEncontradaException } from "../common/exceptions/classificacao/classificacao.exception";

export class ClassificacaoService {

    async criar(consulta_id: number, { parametro, valor_classificacao}: CriarClassificacaoDTO) {

        const consulta = await prisma.consulta.findUnique({
                where: { id: consulta_id }
            })
    
        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

         return await prisma.classificacao.create({
            data: {
                consulta_id,
                parametro,
                valor_classificacao
            },
        });
    
    }

    async atualizar(classificacao_id: number, {  parametro, valor_classificacao }: CriarClassificacaoDTO){

        const classificacao = await prisma.classificacao.findUnique({
            where: { id: classificacao_id }
        })

        if (!classificacao) {
            throw new ClassificacaoNaoEncontradaException();
        }

        return await prisma.classificacao.update({
            where: { id : classificacao_id },
            data: {
                parametro,
                valor_classificacao
            },
        });
    }

    async buscarClassificacoesPorConsultaId(consulta_id: number) {
        const classificacoes = await prisma.classificacao.findMany({
            where: { consulta_id },
        });
        if (!classificacoes) {
            throw new ClassificacaoNaoEncontradaException();
        }
        return classificacoes;
    }
}    