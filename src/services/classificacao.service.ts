import { ConsultaNaoEncontradoException } from "../common/exceptions/consulta/consulta_nao_encontrado.exception";
import { CriarClassificacaoDTO } from "../dtos/classificacao.dto";
import { prisma } from '../prisma/client';
import { ClassificacaoNaoEncontradaException } from "../common/exceptions/classificacao/classificacao.exception";

export class ClassificacaoService {

    /**
     * Cria várias classificações para uma consulta
     */
    async criarVarias(consulta_id: number, classificacoes: CriarClassificacaoDTO[]) {

        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id }
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        // Apaga classificações anteriores (caso já exista algo)
        await prisma.classificacao.deleteMany({
            where: { consulta_id }
        });

        // Insere múltiplos registros
        return await prisma.classificacao.createMany({
            data: classificacoes.map(c => ({
                consulta_id,
                parametro: c.parametro,
                valor_classificacao: c.valor_classificacao
            }))
        });
    }

    /**
     * Atualiza (substituindo) as classificações vinculadas a uma consulta
     */
    async atualizarVarias(consulta_id: number, classificacoes: CriarClassificacaoDTO[]) {
        // Substitui tudo para evitar inconsistência
        try {
            await prisma.classificacao.deleteMany({ where: { consulta_id } });
        } catch {
        }
        return await prisma.classificacao.createMany({
            data: classificacoes.map(c => ({
                consulta_id,
                parametro: c.parametro,
                valor_classificacao: c.valor_classificacao
            }))
        });
    }

    /**
     * Retorna todas as classificações de uma consulta
     */
    async buscarClassificacoesPorConsultaId(consulta_id: number) {
        const classificacoes = await prisma.classificacao.findMany({
            where: { consulta_id },
        });

        if (!classificacoes || classificacoes.length === 0) {
            throw new ClassificacaoNaoEncontradaException();
        }

        return classificacoes;
    }
}
