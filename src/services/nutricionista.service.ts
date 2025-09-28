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
