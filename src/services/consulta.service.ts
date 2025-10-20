import { ConsultaNaoEncontradoException } from '../common/exceptions/consulta/consulta_nao_encontrado.exception';
import { NutricionistaNaoEncontradoException } from '../common/exceptions/nutricionista/nutricionista_nao_encontrado.exception';
import { PacienteNaoEncontradoException } from '../common/exceptions/paciente/paciente_nao_encontrado.exception';
import { CriarConsultaDTO } from '../dtos/consulta.dto';
import { prisma } from '../prisma/client';

export class ConsultaService {

    async criar(
        id_nutricionista: number,
        {
            id_paciente,
            ambc,
            c_pescoco,
            cb,
            cc,
            cmb,
            cq,
            dca,
            dcb,
            dcse,
            dcsi,
            dct,
            dcx,
            eliminacao_intestinal,
            estatura,
            frequencia_evacuatoria,
            imc_atual,
            peso_atual,
            peso_habitual,
            somatorio_dobras
        }: CriarConsultaDTO

    ) {
        const paciente = await prisma.paciente.findFirst({
            where: { id: id_paciente },
        });
        if (!paciente) {
            throw new PacienteNaoEncontradoException();
        }

        return await prisma.consulta.create({
            data: {
                id_nutricionista,
                id_paciente,
                ambc,
                c_pescoco,
                cb,
                cc,
                cmb,
                cq,
                dca,
                dcb,
                dcse,
                dcsi,
                dct,
                dcx,
                eliminacao_intestinal,
                estatura,
                frequencia_evacuatoria,
                imc_atual,
                peso_atual,
                peso_habitual,
                somatorio_dobras
            },
        });
    }


    async atualizar(
        consulta_id: number,
        {
            id_paciente,
            ambc,
            c_pescoco,
            cb,
            cc,
            cmb,
            cq,
            dca,
            dcb,
            dcse,
            dcsi,
            dct,
            dcx,
            eliminacao_intestinal,
            estatura,
            frequencia_evacuatoria,
            imc_atual,
            peso_atual,
            peso_habitual,
            somatorio_dobras
        }: CriarConsultaDTO

    ) {

        const paciente = await prisma.paciente.findFirst({
            where: { id: id_paciente },
        });
        if (!paciente) {
            throw new PacienteNaoEncontradoException();
        }

        return await prisma.consulta.update({
            where: { id: consulta_id },
            data: {
                id_paciente,
                ambc,
                c_pescoco,
                cb,
                cc,
                cmb,
                cq,
                dca,
                dcb,
                dcse,
                dcsi,
                dct,
                dcx,
                eliminacao_intestinal,
                estatura,
                frequencia_evacuatoria,
                imc_atual,
                peso_atual,
                peso_habitual,
                somatorio_dobras
            },
        });
    }

    async buscarConsultaCompleta(consulta_id: number) {
        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id },
            include: {
                diagnostico: true,
                dadosBioquimicos: true,
                recordatorio: true,
                nutricionista: {
                    select: {
                        nome: true,
                        email: true,
                        matricula: true
                    }
                },
                paciente: true,
                classificacoes: true
            }
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        return consulta;
    }


    async buscarConsulta(consulta_id: number) {
        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id }
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        return consulta;
    }


    async buscarConsultaPorPaciente(id: number) {
        const consulta = await prisma.consulta.findMany({
            where: { id_paciente: id }
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        return consulta;
    }

    async buscarConsultaPorPacienteCompleta(id: number) {
        const consulta = await prisma.consulta.findMany({
            where: { id_paciente: id },
            include: {
                diagnostico: true,
                dadosBioquimicos: true,
                recordatorio: true,
                nutricionista: {
                    select: {
                        nome: true,
                        email: true,
                        matricula: true
                    }
                },
                classificacoes: true
            }
        });

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }

        return consulta;
    }

    async buscarConsultaPorNutri(id: number) {

        const consulta = await prisma.consulta.findMany({
            where: { id_nutricionista: id }
        });

        return consulta;
    }

    async buscarConsultaPorNutriCompleta(id: number) {
        const consulta = await prisma.consulta.findMany({
            where: { id_nutricionista: id },
            include: {
                diagnostico: true,
                dadosBioquimicos: true,
                recordatorio: true,
                nutricionista: {
                    select: {
                        nome: true,
                        email: true,
                        matricula: true
                    }
                },
                classificacoes: true
            }
        });

        return consulta;
    }



}