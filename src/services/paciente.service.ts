import { prisma } from '../prisma/client';
import { CriarPacienteDTO } from '../dtos/paciente.dto';

export class PacienteService {
  async criar({ nome, email, cpf , data_nascimento, naturalidade, sexo, telefone, cd_setor}: CriarPacienteDTO) {
      const existe = await prisma.paciente.findFirst({
        where: { OR: [
          { cpf }
        ] },
      });
  
      if (existe) {
        throw new Error('Paciente já cadastrado!');
      }
  
      const novo = await prisma.paciente.create({
        data: {
          cpf,
          nome,
          email,
          data_nascimento: new Date(data_nascimento),
          naturalidade,
          sexo,
          telefone,
          cd_setor
        },
      });
  
      return novo;
    }
}
