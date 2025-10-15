import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CriarDadosDieteticosDTO {

  @IsOptional() @Length(0, 150)
  aversao_alimentos?: string;

  @IsOptional() @Length(0, 150)
  preferencia_alimentos?: string;

  @IsOptional() @Length(0, 150)
  alergia_alimentos?: string;
}
