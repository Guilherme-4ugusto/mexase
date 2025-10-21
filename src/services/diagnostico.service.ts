import { ConsultaNaoEncontradoException } from '../common/exceptions/consulta/consulta_nao_encontrado.exception';
import { DiagnosticoNaoEncontradoException } from '../common/exceptions/diagnostico/diagnostico_nao_encontrado.exception';
import { CriarDiagnosticoDTO } from '../dtos/diagnostico.dto';
import { prisma } from '../prisma/client';


export class DiagnosticoService {

    async criar(
        consulta_id: number,
        {
            conduta_nutricional,
            diagnostico_dietoterapia,
            diagnostico_nutricional
        }: CriarDiagnosticoDTO

    ) {

        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id }
        })

        if (!consulta) {
            throw new ConsultaNaoEncontradoException();
        }


        return await prisma.diagnostico.create({
            data: {
                consulta_id,
                conduta_nutricional,
                diagnostico_dietoterapia,
                diagnostico_nutricional
            },
        });

    }

    async atualizar(
        consulta_id: number,
        {
            conduta_nutricional,
            diagnostico_dietoterapia,
            diagnostico_nutricional
        }: CriarDiagnosticoDTO

    ) {

        const consulta = await prisma.consulta.findUnique({
            where: { id: consulta_id }
        })

        if (!consulta) {
            throw new DiagnosticoNaoEncontradoException();
        }

        return await prisma.diagnostico.update({
            where: { consulta_id },
            data: {
                conduta_nutricional,
                diagnostico_dietoterapia,
                diagnostico_nutricional
            },
        });
    }


    async buscarDiagnosticoPorConsultaId(consulta_id: number) {
        const diagnostico = await prisma.diagnostico.findUnique({
            where: { consulta_id },
        });
        if (!diagnostico) {
            throw new DiagnosticoNaoEncontradoException();
        }
        return diagnostico;
    }

}
