import { IsEnum, IsInt, IsNotEmpty, IsOptional, Length, IsArray, ArrayNotEmpty, ArrayUnique, Matches, IsString } from 'class-validator';
import { TipoRefeicao } from '../common/enums/horario_refeicao.enum';
import { Frequencia } from '../common/enums/frequencia.enum';
import { DiaSemana } from '../common/enums/dia_semana .enum';

export class CriarRecordatorioDTO {
  @IsNotEmpty()
  @IsEnum(TipoRefeicao, {
    message: 'O tipo de refeição deve ser: Desjejum, Colação, Almoço, Lanche, Jantar ou Ceia.',
  })
  tipo_refeicao: TipoRefeicao;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'O horário da refeição deve estar no formato HH:MM (ex: 07:30 ou 18:45).',
  })
  horario_refeicao: string;

  @IsNotEmpty()
  @IsEnum(Frequencia, {
    message: 'A frequência deve ser: Diário, Semanal, Quinzenal ou Mensal.'
  })
  frequencia: Frequencia;

  @IsOptional()
  @Length(0, 250)
  observacao?: string;

  @IsOptional()
  @Length(0, 250)
  alimentos_consumidos?: string;

  @IsNotEmpty()
  @IsEnum(DiaSemana, {
    message: 'O dia da semana deve ser Domingo, Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira ou Sábado.',
  })
  dia_semana: DiaSemana;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  grupos_alimentares_ids: number[];

}
