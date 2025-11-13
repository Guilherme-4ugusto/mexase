import { IsNotEmpty, IsNumber, IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { UnidadeMedida } from '../common/enums/unidade_medida.enum';

export class CriarDadoBioquimicoDTO {
  @IsNotEmpty()
  @IsString()
  nome_exame: string;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsEnum(UnidadeMedida)
  unidade?: UnidadeMedida;

  @IsNotEmpty()
  @IsDateString()
  data_exame: string;

  @IsNotEmpty()
  @IsNumber()
  consulta_id: number;
}
