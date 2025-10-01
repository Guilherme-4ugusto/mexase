import { IsNotEmpty, Length } from 'class-validator';

export class CriarGrupoAlimentarDTO {
  @IsNotEmpty()
  @Length(2, 150)
  nome: string;
}
