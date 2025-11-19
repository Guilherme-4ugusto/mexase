import { Request, Response } from "express";
import PdfService from "../services/pdf.service";
import { logger } from '../utils/logger';

export async function gerarPdfConsulta(req: Request, res: Response) {

  try {
    const idConsulta = Number(req.params.consulta_id);

    if (!idConsulta) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const pdfBuffer = await PdfService.gerarPdfConsulta(idConsulta);

    if (!pdfBuffer) {
      return res.status(500).json({ error: "Erro ao gerar PDF" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=retorno-${idConsulta}.pdf`);
    res.setHeader("Content-Length", pdfBuffer.length.toString());

    return res.end(pdfBuffer);
  } catch (error) {
    logger.error("Erro ao gerar PDF:", error);
    return res.status(500).json({ error: "Erro ao gerar PDF" });
  }
}

