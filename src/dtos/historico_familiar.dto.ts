import { IsNotEmpty, IsBoolean, IsOptional, Length } from 'class-validator';

export class CriarHistoricoFamiliarDTO {
  @IsBoolean() historico_hipertensao: boolean;
  @IsBoolean() historico_diabetes: boolean;
  @IsBoolean() historico_dislipidemia: boolean;
  @IsBoolean() historico_cancer: boolean;
  @IsBoolean() historico_cardiacas: boolean;
  @IsBoolean() historico_tireoide: boolean;
  @IsBoolean() historico_excesso_peso: boolean;

  @IsOptional() @Length(0, 250)
  historico_outras_condicoes?: string;

  @IsOptional() @Length(0, 250)
  antecedentes_familiares?: string;
}
