import { ConsultaNaoEncontradoException } from "../common/exceptions/consulta/consulta_nao_encontrado.exception";
import { prisma } from "../prisma/client";
import { DadosBioquimicosNaoEncontradosException } from "../common/exceptions/dados_bioquimicos/dados_bioquimicos.exception";
import { CriarDadoBioquimicoDTO } from "../dtos/dados_bioquicos.dto";

export class DadosBioquimicosService {

    async criar(consulta_id: number, dados: CriarDadoBioquimicoDTO[]) {
        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id },
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        const novosDados = await prisma.dadoBioquimico.createMany({
            data: dados.map((item) => ({
                consulta_id,
                nome_exame: item.nome_exame,
                valor: item.valor,
                unidade: item.unidade,
                data_exame: new Date(item.data_exame),
            })),
        });

        return novosDados;
    }


    async atualizar(consulta_id: number, dados: CriarDadoBioquimicoDTO[]) {
        try {
            await prisma.dadoBioquimico.deleteMany({
                where: { consulta_id },
            });
        } catch (error) {
        }

        const novos = await prisma.dadoBioquimico.createMany({
            data: dados.map((item) => ({
                consulta_id,
                nome_exame: item.nome_exame,
                valor: item.valor,
                unidade: item.unidade,
                data_exame: new Date(item.data_exame),
            })),
        });

        return novos;
    }

    async buscarDadosBioquimicosPorConsultaId(consulta_id: number) {
        const dados = await prisma.dadoBioquimico.findMany({
            where: { consulta_id },
            orderBy: { data_exame: "desc" },
        });

        if (dados.length === 0) {
            throw new DadosBioquimicosNaoEncontradosException();
        }

        return dados;
    }
}
