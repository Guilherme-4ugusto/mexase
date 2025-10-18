import { IsOptional, Length, IsBoolean, IsInt, IsEnum } from 'class-validator';
import { StatusTabagismo } from '../common/enums/status_tabagismo.enum';

export class CriarEstilosVidaDTO {

  @IsOptional() @Length(0, 100)
  tipo_exercicio?: string;

  @IsOptional() @IsInt()
  frequencia_exercicio_semana?: number;

  @IsOptional() @IsInt()
  duracao_exercicio_minutos?: number;

  @IsOptional() @Length(0, 100)
  orientacao_dieta?: string;

  @IsOptional()
  @IsEnum(StatusTabagismo, { message: 'O tabagista_status deve ser TABAGISTA, EX_TABAGISTA ou NAO_TABAGISTA' })
  tabagista_status?: StatusTabagismo;

  @IsOptional() @IsBoolean()
  etilista?: boolean;

  @IsOptional() duracao_etilismo_anos?: number;
  @IsOptional() @Length(0, 50)
  frequencia_etilismo?: string;

  @IsOptional() @IsBoolean()
  problema_denticao?: boolean;

  @IsOptional() tempo_sono_horas?: number;

  @IsOptional() @Length(0, 150)
  medicamentos?: string;

  @IsOptional() @Length(0, 150)
  suplementos?: string;

  @IsOptional() @IsBoolean()
  restricao_sal?: boolean;

  @IsOptional() @IsBoolean()
  restricao_acucar?: boolean;

  @IsOptional() @Length(0, 100)
  outras_restricoes?: string;

  @IsOptional() @Length(0, 100)
  local_refeicoes?: string;

  @IsOptional() @Length(0, 100)
  quem_prepara_refeicoes?: string;
}
