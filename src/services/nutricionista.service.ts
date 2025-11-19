// src/services/nutricionista.service.ts
import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";
import {
  CriarNutricionistaDTO,
  AlterarSenhaNutricionistaDTO,
} from "../dtos/nutricionista.dto";

export class NutricionistaService {
  async criar({
    matricula,
    nome,
    email,
    senha,
    telefone,
    isAdmin,
  }: CriarNutricionistaDTO) {
    const existe = await prisma.nutricionista.findFirst({
      where: { OR: [{ email }, { matricula }] },
    });

    if (existe) {
      throw new Error("Email ou matricula já cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novo = await prisma.nutricionista.create({
      data: {
        matricula,
        nome,
        email,
        telefone,
        isAdmin: isAdmin || false,
        senha: senhaCriptografada,
      },
    });

    const { senha: _, ...nutricionistaSemSenha } = novo;
    return nutricionistaSemSenha;
  }

  async atualizar(
    id: number,
    {
      matricula,
      nome,
      email,
      senha,
      telefone,
      isAdmin,
    }: Partial<CriarNutricionistaDTO>
  ) {
    const nutricionista = await prisma.nutricionista.findUnique({
      where: { id },
    });

    if (!nutricionista) {
      throw new Error("Nutricionista não encontrado");
    }

    if (email || matricula) {
      const existe = await prisma.nutricionista.findFirst({
        where: {
          OR: [
            email ? { email } : undefined,
            matricula ? { matricula } : undefined,
          ].filter(Boolean) as any,
          NOT: { id },
        },
      });

      if (existe) {
        throw new Error(
          "Email ou matrícula já cadastrados por outro nutricionista"
        );
      }
    }

    let senhaCriptografada: string | undefined;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const atualizado = await prisma.nutricionista.update({
      where: { id },
      data: {
        matricula,
        nome,
        email,
        telefone,
        senha: senhaCriptografada,
        isAdmin,
      },
    });

    const { senha: _, ...nutricionistaSemSenha } = atualizado;
    return nutricionistaSemSenha;
  }

  async buscarTodos(page: number, limit: number, filtros: any) {
    const where: any = { desativadoEm: null };

    for (const [key, value] of Object.entries(filtros)) {
      if (value == null) continue;

      if (typeof value === "string") {
        where[key] = {
          contains: value,
          mode: "insensitive",
        };
      } else {
        where[key] = value;
      }
    }

    const totalItems = await prisma.nutricionista.count({
      where,
    });

    const nutricionistas = await prisma.nutricionista.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        matricula: true,
        criadoEm: true,
        isAdmin: true,
        isTemaDark: true,
      },
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { nome: "asc" },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: nutricionistas,
      meta: {
        totalItems,
        totalPages,
        page,
        limit,
      },
    };
  }

  async buscar(id: number) {
    const nutricionista = await prisma.nutricionista.findUnique({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        matricula: true,
        criadoEm: true,
        isAdmin: true,
        isTemaDark: true,
      },
      where: {
        id,
      },
    });

    if (!nutricionista) {
      throw new Error("Nenhum nutricionista encontrado");
    }

    return nutricionista;
  }

  async inativar(id: number) {
    await prisma.nutricionista.update({
      where: {
        id,
      },
      data: {
        desativadoEm: new Date(),
      },
    });
    return;
  }

  async reativar(id: number) {
    await prisma.nutricionista.update({
      where: {
        id,
      },
      data: {
        desativadoEm: null,
      },
    });
    return;
  }

  async alterarSenha(id: number, { senha }: AlterarSenhaNutricionistaDTO) {
    const nutricionista = await prisma.nutricionista.findUnique({
      where: { id },
    });

    if (!nutricionista) {
      throw new Error("Nutricionista não encontrado");
    }

    let senhaCriptografada: string | undefined;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    await prisma.nutricionista.update({
      where: {
        id,
      },
      data: {
        senha: senhaCriptografada,
      },
    });
    return;
  }

  async alterarTema(id: number) {
    const nutricionista = await prisma.nutricionista.findUnique({
      where: { id },
    });

    if (!nutricionista) {
      throw new Error("Nutricionista não encontrado");
    }

    let data = {};

    if (nutricionista.isTemaDark) {
      data = { isTemaDark: false };
    } else {
      data = { isTemaDark: true };
    }

    await prisma.nutricionista.update({
      where: {
        id,
      },
      data,
    });
    return;
  }

  async totalConsultasDoMes(id: number) {
    const agora = new Date();

    const inicioMesAtual = new Date(agora.getFullYear(), agora.getMonth(), 1);

    const inicioMesAnterior = new Date(
      agora.getFullYear(),
      agora.getMonth() - 1,
      1
    );

    const fimMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);

    const totalMesAtual = await prisma.consulta.count({
      where: {
        id_nutricionista: id,
        data_consulta: {
          gte: inicioMesAtual,
          lte: agora,
        },
      },
    });

    const totalMesAnterior = await prisma.consulta.count({
      where: {
        id_nutricionista: id,
        data_consulta: {
          gte: inicioMesAnterior,
          lte: fimMesAnterior,
        },
      },
    });

    let crescimento = 0;

    if (totalMesAnterior > 0) {
      crescimento =
        ((totalMesAtual - totalMesAnterior) / totalMesAnterior) * 100;
    }

    return {
      totalMesAtual,
      totalMesAnterior,
      crescimento: Number(crescimento.toFixed(2)),
    };
  }

  async ultimos12MesesConsultas(id: number) {
    const agora = new Date();

    const inicioPeriodo = new Date(
      agora.getFullYear(),
      agora.getMonth() - 11,
      1
    );
    const fimPeriodo = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);

    const consultas = await prisma.$queryRaw<
      { ano: number; mes: number; total: number }[]
    >`
    SELECT 
      YEAR(data_consulta) AS ano,
      MONTH(data_consulta) AS mes,
      COUNT(*) AS total
    FROM consulta
    WHERE id_nutricionista = ${id}
      AND data_consulta BETWEEN ${inicioPeriodo} AND ${fimPeriodo}
    GROUP BY ano, mes
    ORDER BY ano, mes;
  `;

    const meses = [];

    for (let i = 0; i < 12; i++) {
      const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);

      meses.push({
        ano: data.getFullYear(),
        mes: data.getMonth() + 1,
      });
    }

    meses.reverse();

    const mesesComTotais = meses.map((m) => {
      const encontrado = consultas.find(
        (c) => c.ano === m.ano && c.mes === m.mes
      );

      return {
        ano: m.ano,
        mes: m.mes,
        total: encontrado ? Number(encontrado.total) : 0,
      };
    });

    return mesesComTotais;
  }
}
