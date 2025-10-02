import { IsNotEmpty, Length } from 'class-validator';

export class CriarClassificacaoDTO {
  @IsNotEmpty({ message: 'Consulta é obrigatória' })
  consulta_id: number;

  @IsNotEmpty({ message: 'Parâmetro é obrigatório' })
  @Length(2, 50)
  parametro: string;

  @IsNotEmpty({ message: 'Valor de classificação é obrigatório' })
  @Length(2, 100)
  valor_classificacao: string;
}
