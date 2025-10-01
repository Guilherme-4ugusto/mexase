import { IsNotEmpty, Length } from 'class-validator';

export class CriarSetorDTO {
  @IsNotEmpty({ message: 'Nome do setor é obrigatório' })
  @Length(2, 60, { message: 'Nome deve ter entre 2 e 60 caracteres' })
  nome: string;
}