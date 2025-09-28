import { IsEmail, IsNotEmpty} from 'class-validator';

export class RealizarLoginDTO {
      @IsEmail({}, {message: 'Email inválido'})
      email: string;

      @IsNotEmpty({ message: 'Senha é obrigatória' })
      senha: string
}