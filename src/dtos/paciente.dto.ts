import { IsNotEmpty, Length, IsEmail, IsOptional, IsEnum, IsDate, Matches} from 'class-validator';
import { Sexo } from '../common/enums/sexo.enum';

export class CriarPacienteDTO {
  @IsNotEmpty({ message: 'O nome � obrigat�rio' })
  @Length(2, 150, { message: 'O nome deve ter entre 2 e 150 caracteres' })
  nome: string;

  @IsEmail({}, { message: 'O email deve ser v�lido' })
  @Length(5, 254, { message: 'O email deve ter entre 5 e 254 caracteres' })
  email: string;

  @Length(11, 11, { message: 'CPF inv�lido!' })
  cpf: string;

  @IsNotEmpty({ message: 'A data de nascimento � obrigat�ria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
  message: 'A data de nascimento deve estar no formato YYYY-MM-DD',
  })
  data_nascimento: string;

  @IsOptional()
  @Length(8, 11, { message: 'O telefone deve ter entre 8 e 11 d�gitos' })
  telefone?: string;

  @IsOptional()
  @IsEnum(Sexo, { message: 'O sexo deve ser F (Feminino) ou M (Masculino)' })
  sexo?: Sexo;

  @IsOptional()
  @Length(2, 60, { message: 'A naturalidade deve ter entre 2 e 60 caracteres' })
  naturalidade?: string;

  @IsNotEmpty({ message: 'O setor � obrigat�rio' })
  cd_setor: number;
}
