import { IsEnum, IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { HorarioRefeicao } from '../common/enums/horario_refeicao.enum';
import { Frequencia } from '../common/enums/frequencia.enum';

export class CriarRecordatorioDTO {
  @IsNotEmpty()
  @IsEnum(HorarioRefeicao, { message: 'O horário refeição deve ser Café da Manhã, Lanche da Manhã, Almoço, Lanche da Tarde, Jantar, Ceia, Outro' })
  horario_refeicao: HorarioRefeicao;

  @IsNotEmpty()
  @IsEnum(Frequencia, { message: 'A frequencia deve ser Diário, Semanal, Mensal, Eventual' })
  frequencia: Frequencia;

  @IsOptional()
  @Length(0, 250)
  observacao?: string;

  @IsNotEmpty()
  @IsInt()
  id_grupo_alimentar: number;
}