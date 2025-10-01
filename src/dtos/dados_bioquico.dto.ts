import { IsNotEmpty, IsNumber } from 'class-validator';

export class CriarDadosBioquimicosDTO {
  @IsNotEmpty() @IsNumber()
  hemoglobina: number;

  @IsNotEmpty() @IsNumber()
  hematocrito: number;
}
