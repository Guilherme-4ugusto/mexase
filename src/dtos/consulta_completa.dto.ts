// criar-consulta.dto.ts
import 'reflect-metadata';
import { Type } from "class-transformer";
import { ValidateNested, IsArray, IsObject } from "class-validator";
import { CriarHistoricoFamiliarDTO } from "./historico_familiar.dto";
import { CriarEstilosVidaDTO } from "./estilo_vida.dto";
import { CriarConsultaDTO } from "./consulta.dto";
import { CriarRecordatorioDTO } from "./recordatorio.dto";
import { CriarDadosDieteticosDTO } from "./dados_dieteticos_dto";
import { CriarDadoBioquimicoDTO } from "./dados_bioquicos.dto";
import { CriarDiagnosticoDTO } from "./diagnostico.dto";
import { CriarClassificacaoDTO } from "./classificacao.dto";

export class CriarConsultaCompletaDTO {
  
  @IsObject()
  @ValidateNested()
  @Type(() => CriarHistoricoFamiliarDTO)
  historicoFamiliar: CriarHistoricoFamiliarDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => CriarEstilosVidaDTO)
  estiloVida: CriarEstilosVidaDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => CriarConsultaDTO)
  consultaBase: CriarConsultaDTO;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CriarRecordatorioDTO)
  recordatorio: CriarRecordatorioDTO[];

  @IsObject()
  @ValidateNested()
  @Type(() => CriarDadosDieteticosDTO)
  dadosDieteticos: CriarDadosDieteticosDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriarDadoBioquimicoDTO)
  dados_bioquimicos: CriarDadoBioquimicoDTO[];

  @IsObject()
  @ValidateNested()
  @Type(() => CriarDiagnosticoDTO)
  diagnostico: CriarDiagnosticoDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriarClassificacaoDTO)
  classificacao: CriarClassificacaoDTO[];
}
