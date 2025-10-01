import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CriarConsultaDTO {
  @IsOptional() eliminacao_intestinal?: string;
  @IsOptional() frequencia_evacuatoria?: string;
  
  @IsOptional() @IsNumber() peso_atual?: number;
  @IsOptional() @IsNumber() peso_habitual?: number;
  @IsOptional() @IsNumber() estatura?: number;
  @IsOptional() @IsNumber() imc_atual?: number;

  @IsOptional() @IsNumber() cb?: number;
  @IsOptional() @IsNumber() cc?: number;
  @IsOptional() @IsNumber() cq?: number;
  @IsOptional() @IsNumber() c_pescoco?: number;

  @IsOptional() @IsNumber() dct?: number;
  @IsOptional() @IsNumber() dcb?: number;
  @IsOptional() @IsNumber() dcse?: number;
  @IsOptional() @IsNumber() dcsi?: number;
  @IsOptional() @IsNumber() dcx?: number;
  @IsOptional() @IsNumber() dca?: number;

  @IsOptional() @IsNumber() ambc?: number;
  @IsOptional() @IsNumber() cmb?: number;
  @IsOptional() @IsNumber() somatorio_dobras?: number;

  @IsNotEmpty() id_classificacao: number;
  @IsNotEmpty() id_diagnostico: number;
  @IsNotEmpty() id_nutricionista: number;
  @IsNotEmpty() id_paciente: number;
  @IsNotEmpty() id_dados_bioquimicos: number;
  @IsNotEmpty() id_recordatorio: number;
}
