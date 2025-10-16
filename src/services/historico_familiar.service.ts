import { PacienteNaoEncontradoException } from "../common/exceptions/paciente/paciente_nao_encontrado.exception";
import { CriarHistoricoFamiliarDTO } from "../dtos/historico_familiar.dto";
import { prisma } from '../prisma/client';
import { HistoricoFamiliarJaCadastradoException } from '../common/exceptions/historico_familiar/historico_familiar_ja_cadastrado.exception';
import { HistoricoFamiliarNaoEncontradoException } from '../common/exceptions/historico_familiar/historico_familiar_nao_encontrado.exception';

export class HistoricoFamiliarService {
    async criar(
        paciente_id : number,
        {
            historico_hipertensao, 
            historico_diabetes, 
            historico_dislipidemia, 
            historico_cancer, 
            historico_cardiacas, 
            historico_tireoide, 
            historico_excesso_peso,
            historico_outras_condicoes,
            antecedentes_familiares
        } : CriarHistoricoFamiliarDTO){
            const paciente = await prisma.paciente.findUnique({
                where: { id: paciente_id },
            });
            
            if (!paciente) throw new PacienteNaoEncontradoException();

            const dadosExistentes = await prisma.historicoFamiliar.findUnique({
                where: { paciente_id },
            });
    
            if (dadosExistentes) throw new HistoricoFamiliarJaCadastradoException();

            await prisma.historicoFamiliar.create({
                data: {
                    paciente_id, 
                    historico_hipertensao, 
                    historico_diabetes, 
                    historico_dislipidemia, 
                    historico_cancer, 
                    historico_cardiacas, 
                    historico_tireoide, 
                    historico_excesso_peso,
                    historico_outras_condicoes,
                    antecedentes_familiares
                }
            });

            return 
    }
    
    async atualizar(
        paciente_id: number, 
        {
            historico_hipertensao, 
            historico_diabetes, 
            historico_dislipidemia, 
            historico_cancer, 
            historico_cardiacas, 
            historico_tireoide, 
            historico_excesso_peso,
            historico_outras_condicoes,
            antecedentes_familiares
        } : CriarHistoricoFamiliarDTO){

        const paciente = await prisma.paciente.findUnique({
            where: { id: paciente_id },
        });
        
        if (!paciente) throw new PacienteNaoEncontradoException();

        const dadosExistentes = await prisma.historicoFamiliar.findUnique({
            where: { paciente_id },
        });
    
        if (!dadosExistentes) throw new HistoricoFamiliarNaoEncontradoException();

        await prisma.historicoFamiliar.update({
          where: { paciente_id},
          data: {
            historico_hipertensao, 
            historico_diabetes, 
            historico_dislipidemia, 
            historico_cancer, 
            historico_cardiacas, 
            historico_tireoide, 
            historico_excesso_peso,
            historico_outras_condicoes,
            antecedentes_familiares,
          },
        });
    
        return
    }

    async buscarHistoricoFamiliarPorPacienteId(paciente_id: number) {
        const dadosHistoricoFamiliar = await prisma.historicoFamiliar.findUnique({
            where: { paciente_id },
        });
        return dadosHistoricoFamiliar;
    }
}