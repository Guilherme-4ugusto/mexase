import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CriarNutricionistaDTO {
  @IsNotEmpty({message: 'Matricula é obrigatório'})
  matricula: number;
  @IsNotEmpty({message: 'Nome é obrigatório'})
  @Length(2, 150, {message: 'Nome deve ter entre 2 e 150 caracteres'})
  nome: string;
  @IsEmail({}, {message: 'Email inválido'})
  @Length(5, 254, { message: 'Email deve ter entre 5 e 254 caracteres' })
  email: string;
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Length(6, 100, { message: 'Senha deve ter pelo menos 6 caracteres' })
  senha: string;
}