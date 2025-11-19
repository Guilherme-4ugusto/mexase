import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export async function gerarPdfRetorno(dados: Record<string, any>) {
  const templatePath = path.join(__dirname, "templates", "retorno.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error("Template retorno.html não encontrado no caminho: " + templatePath);
  }

  let html = fs.readFileSync(templatePath, "utf8");

  // Substituição segura das variáveis
  for (const key of Object.keys(dados)) {
    const value =
      dados[key] === null || dados[key] === undefined
        ? ""
        : String(dados[key]);

    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    html = html.replace(regex, value);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm",
    }
  });

  await browser.close();

  return pdf;
}
