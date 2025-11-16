import { prisma } from '../prisma/client';

export class GrupoAlimentarService {

    async listarGrupoAlimentar(){
        const grupoAlimentar = prisma.grupoAlimentar.findMany();
        return grupoAlimentar;
    }
}
