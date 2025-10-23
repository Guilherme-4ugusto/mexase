import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Classificacao } from '../common/enums/classificacao.enum';

export class CriarClassificacaoDTO {
  @IsNotEmpty({ message: 'Parâmetro é obrigatório' })
  @IsEnum(Classificacao, { message: 'Parâmetro inválido' })
  parametro: Classificacao;

  @IsNotEmpty({ message: 'Valor de classificação é obrigatório' })
  @Length(2, 100)
  valor_classificacao: string;
}
