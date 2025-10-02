import { IsNotEmpty, Length, IsEmail, IsDateString, IsOptional } from 'class-validator';

export class CriarPacienteDTO {
  @IsNotEmpty() @Length(2, 150)
  nome: string;

  @IsEmail()
  @Length(5, 254)
  email: string;

  @IsNotEmpty() @IsDateString()
  data_nascimento: string;

  @IsOptional() @Length(8, 11)
  telefone?: string;

  @IsOptional() sexo?: string;

  @IsOptional() @Length(2, 60)
  naturalidade?: string;
}
