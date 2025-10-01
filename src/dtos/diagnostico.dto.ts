import { IsNotEmpty, Length } from 'class-validator';

export class CriarDiagnosticoDTO {
  @IsNotEmpty() @Length(2, 400)
  diagnostico_nutricional: string;

  @IsNotEmpty() @Length(2, 400)
  diagnostico_dietoterapia: string;

  @IsNotEmpty() @Length(2, 400)
  conduta_nutricional: string;
}
