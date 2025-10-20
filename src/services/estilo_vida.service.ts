import { prisma } from '../prisma/client';
import { PacienteNaoEncontradoException } from '../common/exceptions/paciente/paciente_nao_encontrado.exception';
import { EstiloVidaJaCadastradoException } from '../common/exceptions/estilo_vida/estilo_vida_ja_cadastrado.exception';
import { EstiloVidaNaoEncontradoException } from '../common/exceptions/estilo_vida/estilo_vida_nao_encontrado.exception';
import { CriarEstilosVidaDTO } from '../dtos/estilo_vida.dto';

export class EstiloVidaService {
    async criar(
        paciente_id: number,
        {
            tipo_exercicio,
            frequencia_exercicio_semana,
            duracao_exercicio_minutos,
            orientacao_dieta,
            tabagista_status,
            etilista,
            duracao_etilismo_anos,
            frequencia_etilismo,
            problema_denticao,
            tempo_sono_horas,
            medicamentos,
            suplementos,
            restricao_sal,
            restricao_acucar,
            outras_restricoes,
            local_refeicoes,
            quem_prepara_refeicoes,
        }: CriarEstilosVidaDTO
    ) {
        const paciente = await prisma.paciente.findUnique({
            where: { id: paciente_id },
        });

        if (!paciente) throw new PacienteNaoEncontradoException();

        const dadosExistentes = await prisma.estilosVida.findUnique({
            where: { paciente_id },
        });

        if (dadosExistentes) throw new EstiloVidaJaCadastradoException();

        return await prisma.estilosVida.create({
            data: {
                paciente_id,
                tipo_exercicio,
                frequencia_exercicio_semana,
                duracao_exercicio_minutos,
                orientacao_dieta,
                tabagista_status,
                etilista: etilista,
                duracao_etilismo_anos,
                frequencia_etilismo,
                problema_denticao,
                tempo_sono_horas,
                medicamentos,
                suplementos,
                restricao_sal,
                restricao_acucar,
                outras_restricoes,
                local_refeicoes,
                quem_prepara_refeicoes,
            },
        });
    }

    async atualizar(
        paciente_id: number,
        {
            tipo_exercicio,
            frequencia_exercicio_semana,
            duracao_exercicio_minutos,
            orientacao_dieta,
            tabagista_status,
            etilista,
            duracao_etilismo_anos,
            frequencia_etilismo,
            problema_denticao,
            tempo_sono_horas,
            medicamentos,
            suplementos,
            restricao_sal,
            restricao_acucar,
            outras_restricoes,
            local_refeicoes,
            quem_prepara_refeicoes,
        }: CriarEstilosVidaDTO
    ) {
        const paciente = await prisma.paciente.findUnique({
            where: { id: paciente_id },
        });

        if (!paciente) throw new PacienteNaoEncontradoException();

        const dadosExistentes = await prisma.estilosVida.findUnique({
            where: { paciente_id },
        });

        if (!dadosExistentes) throw new EstiloVidaNaoEncontradoException();

        return await prisma.estilosVida.update({
            where: { paciente_id },
            data: {
                tipo_exercicio,
                frequencia_exercicio_semana,
                duracao_exercicio_minutos,
                orientacao_dieta,
                tabagista_status,
                etilista: etilista,
                duracao_etilismo_anos,
                frequencia_etilismo,
                problema_denticao,
                tempo_sono_horas,
                medicamentos,
                suplementos,
                restricao_sal,
                restricao_acucar,
                outras_restricoes,
                local_refeicoes,
                quem_prepara_refeicoes,
            },
        });
    }



    async buscarEstiloVidaPorPacienteId(paciente_id: number) {
        const dadosEstiloVida = await prisma.estilosVida.findUnique({
            where: { paciente_id },
        });
        if(!dadosEstiloVida){
            throw new EstiloVidaNaoEncontradoException();
        }
        return dadosEstiloVida;
    }
}
