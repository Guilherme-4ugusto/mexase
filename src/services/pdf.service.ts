import { prisma } from '../prisma/client';
import { gerarPdfRetorno } from "../utils/gerarPdfRetorno";
import { formatarTelefone, calcularIdade } from '../utils/utils';

class PdfService {
  static async gerarPdfConsulta(idConsulta: number) {

    const consulta = await prisma.consulta.findUnique({
      where: { id: idConsulta },
      include: {
        paciente: {
          include: { estilosVida: true, setor: true}
        },
        nutricionista: true,
        diagnostico: true,
        dados_bioquimicos: true,
        recordatorio: {
          include: {
            grupos: { include: { grupo_alimentar: true } }
          }
        },
        classificacoes: true,
      }
    });

    if (!consulta) {
      throw new Error("Consulta não encontrada");
    }

    const paciente = consulta.paciente;

    const dados = {
      paciente_nome: paciente.nome,
      paciente_idade: calcularIdade(paciente.data_nascimento),
      paciente_sexo: paciente.sexo == "M" ? "Masculino" : paciente.sexo == "F" ? "Feminino" : "Outro",
      paciente_setor: paciente.setor.nome ?? "-",
      paciente_naturalidade: paciente.naturalidade ?? "-",
      paciente_telefone: formatarTelefone(paciente.telefone) ?? "-",
      paciente_email: paciente.email ?? "-",

      data_consulta: consulta.data_consulta.toLocaleDateString("pt-BR"),
      objetivo_consulta: consulta.objetivo_consulta ?? "-",

      somatorio_dobras: consulta.somatorio_dobras ?? "-",

      linhas_antropometria: gerarAntropometria(consulta),

      bioquimica_linhas: gerarBioquimica(consulta),

      recordatorio_linhas: gerarRecordatorio(consulta),

      diagnostico_nutricional: consulta.diagnostico?.diagnostico_nutricional ?? "-",
      diagnostico_dietoterapia: consulta.diagnostico?.diagnostico_dietoterapia ?? "-",
      conduta_nutricional: consulta.diagnostico?.conduta_nutricional ?? "-",
    };

    const pdf = await gerarPdfRetorno(dados);

    return pdf;
  }
}

export default PdfService;

function gerarBioquimica(consulta: any) {
  if (!consulta.dados_bioquimicos.length)
    return `<tr><td colspan="4">Nenhum exame informado</td></tr>`;

  return consulta.dados_bioquimicos
    .map((b: any) => `
      <tr>
        <td>${b.nome_exame}</td>
        <td>${b.valor ?? "-"}</td>
        <td>${b.unidade ?? "-"}</td>
        <td>${new Date(b.data_exame).toLocaleDateString("pt-BR")}</td>
      </tr>
    `)
    .join("");
}

function gerarRecordatorio(consulta: any) {
  if (!consulta.recordatorio.length)
    return `<tr><td colspan="5">Nenhum recordatório informado</td></tr>`;

  return consulta.recordatorio
    .map((r: any) => `
      <tr>
        <td>${r.dia_semana}</td>
        <td>${r.tipo_refeicao}</td>
        <td>${r.horario_refeicao ?? "-"}</td>
        <td>${r.alimentos_consumidos ?? "-"}</td>
        <td>${r.frequencia ?? "-"}</td>
      </tr>
    `)
    .join("");
}

function normalize(txt: string) {
  return txt
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function gerarAntropometria(c: any) {
  const linhas = [
    ["peso_atual", "Peso atual", `${c.peso_atual ?? "-"} kg`],
    ["peso_habitual", "Peso habitual", `${c.peso_habitual ?? "-"} kg`],
    ["estatura", "Estatura", `${c.estatura ?? "-"} m`],
    ["imc_atual", "IMC atual", c.imc_atual ?? "-"],
    ["cc", "CC", `${c.cc ?? "-"} cm`],
    ["cq", "CQ", `${c.cq ?? "-"} cm`],
    ["cb", "CB", `${c.cb ?? "-"} cm`],
    ["c_pescoco", "C. Pescoço", `${c.c_pescoco ?? "-"} cm`],
    ["dct", "DCT", `${c.dct ?? "-"} mm`],
    ["dcb", "DCB", `${c.dcb ?? "-"} mm`],
    ["dcse", "DCSE", `${c.dcse ?? "-"} mm`],
    ["dcsi", "DCSI", `${c.dcsi ?? "-"} mm`],
    ["dcx", "DCX", `${c.dcx ?? "-"} mm`],
    ["dca", "DCA", `${c.dca ?? "-"} mm`],
    ["ambc", "AMBc", `${c.ambc ?? "-"} cm²`],
    ["cmb", "CMB", `${c.cmb ?? "-"} cm`],
    ["somatorio_dobras", "Somatório de dobras", `${c.somatorio_dobras ?? "-"}`],
  ];

  const classMap = Object.fromEntries(
    c.classificacoes.map((i: any) => [
      normalize(i.parametro || ""),
      i.valor_classificacao
    ])
  );

  return linhas
    .map(([key, rotulo, valor]) => {
      const chaveNormalizada = normalize(key);
      return `
        <tr>
          <td>${rotulo}</td>
          <td>${valor}</td>
          <td>${classMap[chaveNormalizada] ?? "-"}</td>
        </tr>
      `;
    })
    .join("");
}