// src/services/nutricionista.service.ts
import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { CriarNutricionistaDTO } from '../dtos/nutricionista.dto';

export class NutricionistaService {
  async criar({ matricula, nome, email, senha }: CriarNutricionistaDTO) {
    const existe = await prisma.nutricionista.findFirst({
      where: { OR: [
        { email },
        { matricula }
      ] },
    });

    if (existe) {
      throw new Error('Email ou matricula já cadastrado');
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novo = await prisma.nutricionista.create({
      data: {
        matricula,
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    const { senha: _, ...nutricionistaSemSenha } = novo;
    return nutricionistaSemSenha;
  }

  async atualizar(id: number, { matricula, nome, email, senha }: Partial<CriarNutricionistaDTO>) {
    const nutricionista = await prisma.nutricionista.findUnique({ where: { id } });

    if (!nutricionista) {
      throw new Error('Nutricionista não encontrado');
    }

    if (email || matricula) {
      const existe = await prisma.nutricionista.findFirst({
        where: {
          OR: [
            email ? { email } : undefined,
            matricula ? { matricula } : undefined
          ].filter(Boolean) as any,
          NOT: { id }
        },
      });

      if (existe) {
        throw new Error('Email ou matrícula já cadastrados por outro nutricionista');
      }
    }

    let senhaCriptografada: string | undefined;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const atualizado = await prisma.nutricionista.update({
      where: { id },
      data: {
        matricula,
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    const { senha: _, ...nutricionistaSemSenha } = atualizado;
    return nutricionistaSemSenha;
  }

  async buscar( id : number) {
    if(id){
      const nutricionista = await prisma.nutricionista.findUnique({
        select: {
          id: true,
          nome: true,
          email: true,
          matricula: true,
          criadoEm: true,
        },
        where: {
          id
        }
      })

      if(!nutricionista){
        throw new Error('Nenhum nutricionista encontrado');
      }

      return nutricionista;
    } else {
      const nutricionistas = await prisma.nutricionista.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          matricula: true,
          criadoEm: true,
        },
      });

      if(!nutricionistas){
        throw new Error('Nenhum nutricionista encontrado');
      }

      return nutricionistas;
    }
  }

  async inativar( id : number) {
    await prisma.nutricionista.update({
      where: {
        id,
      },
      data: {
        desativadoEm: new Date(),
      },
    });
    return 
  }

   async reativar( id : number) {
    await prisma.nutricionista.update({
      where: {
        id,
      },
      data: {
        desativadoEm: null,
      },
    });
    return 
  }
}
