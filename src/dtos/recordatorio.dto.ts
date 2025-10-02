import { IsEnum, IsNotEmpty } from "class-validator";
import { HorarioRefeicao } from "../common/enums/horario_refeicao.enum";
import { Frequencia } from "../common/enums/frequencia.enum";

export class CriarRecordatorioDTO {
  @IsNotEmpty()
  @IsEnum(HorarioRefeicao)
  horario_refeicao: HorarioRefeicao;

  @IsNotEmpty()
  @IsEnum(Frequencia)
  frequencia: Frequencia;
}
