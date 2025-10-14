import { Request, Response } from "express";
import db from "../config/firebaseconfig";

export async function listarProdutos(req: Request, res: Response) {
  try {
    const [rows]: any = await db.query("SELECT * FROM produto where deleted = 0");

    res.json({ produtos: rows });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function cadastrarProduto(req: Request, res: Response) {
  const { nome, descricao, preco, tipo, codigoBarras } = req.body;

  try {
    const query = `
      INSERT INTO produto (nome, descricao, preco, tipo, codigo_barras, deleted)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const deleted = false;
    await db.query(query, [nome, descricao, preco, tipo, codigoBarras, deleted ? 1 : 0]);

    res.status(201).json({ mensagem: "Produto cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ error: "Erro ao cadastrar produto." });
  }
}

export async function cadastrarProdutoPorCodigo(req: Request, res: Response) {
  const { codigo_barras } = req.body;

  if (!codigo_barras) {
    return res.status(400).json({ error: "Código de barras é obrigatório" });
  }

  try {
    const query = `
      INSERT INTO produto (nome, descricao, preco, tipo, deleted, codigo_barras)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    // Pode colocar valores padrão, depois o usuário edita
    await db.query(query, [
      `Produto ${codigo_barras}`, // nome padrão
      "", // descrição vazia
      0.0, // preço padrão
      "unidade", // tipo padrão
      false,
      codigo_barras,
    ]);

    res
      .status(201)
      .json({ mensagem: "Produto cadastrado com sucesso", codigo_barras });
  } catch (error: any) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Código de barras já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao cadastrar produto" });
  }
}

export async function atualizarProduto(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, descricao, preco, codigoBarras, tipo } = req.body;

  const idProduto = Number(id);

  try {
    const query = `
      UPDATE produto 
      SET nome = ?, descricao = ?, preco = ?, codigo_barras = ?, tipo = ?
      WHERE id = ?
    `;

    const [result]: any = await db.query(query, [
      nome,
      descricao,
      preco,
      codigoBarras,
      tipo,
      idProduto,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function excluirProduto(req: Request, res: Response) {
  const { id } = req.params;
  const idProduto = Number(id);

  if (!idProduto) {
    return res.status(400).json({ error: "ID do produto inválido." });
  }

  try {
    const query = "UPDATE produto SET deleted = ? WHERE id = ?";
    const deleted = true;

    const [result]: any = await db.query(query, [deleted ? 1 : 0, idProduto]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Produto não encontrado ou já excluído." });
    }

    res.json({ mensagem: "Produto excluído com sucesso (soft delete)." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function buscarProduto(req: Request, res: Response) {
  const { id } = req.params; // id via rota (ex: /produto/1)
  const { nome } = req.query; // nome via query string (ex: /produto?nome=caneta)

  try {
    let query = "SELECT * FROM produto WHERE deleted = 0"; // Apenas produtos não excluídos
    const params: any[] = [];

    if (id) {
      query += " AND id = ?";
      params.push(Number(id));
    }

    if (nome) {
      query += " AND nome LIKE ?";
      params.push(`%${nome}%`);
    }

    const [rows]: any = await db.query(query, params);

    const produtos = rows.map((row: any) => ({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      tipo: row.tipo,
      codigoBarras: row.codigo_barras,
      preco: row.preco,
      deleted: row.deleted
    }));

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ produtos });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function buscarProdutoPorCodigoBarras(req: Request, res: Response) {
  const { codigoBarras } = req.query;

  try {
    let query = "SELECT * FROM produto WHERE codigo_barras = ? AND deleted = 0";
    const params: any[] = [codigoBarras];

    const [rows]: any = await db.query(query, params);

    const produtos = rows.map((row: any) => ({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      tipo: row.tipo,
      codigoBarras: row.codigo_barras,
      preco: row.preco,
      deleted: row.deleted
    }));

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ produtos });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}
