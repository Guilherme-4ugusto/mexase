import { prisma } from '../prisma/client';

export class SetorService {

    async listarSetores(){
        const setores = prisma.setor.findMany();
        return setores;
    }
}
