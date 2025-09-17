import { Request, Response } from "express";
import db from "../config/db";

export async function listarProdutos(req: Request, res: Response) {
  try {
    const [rows]: any = await db.query("SELECT * FROM produto");

    res.json({ produtos: rows });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function cadastrarProduto(req: Request, res: Response) {
  const { nome, descricao, valor, quantidade } = req.body;

  if (!nome || valor == null || quantidade == null) {
    return res.status(400).json({ error: "Preencha nome, valor e quantidade." });
  }

  try {
    const query = "INSERT INTO produto (nome, descricao, valor, quantidade, deleted) VALUES (?, ?, ?, ?, ?)";
    const deleted = false;
    await db.query(query, [nome, descricao, valor, quantidade, deleted ? 1 : 0]);

    res.status(201).json({ mensagem: "Produto cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ error: "Erro ao cadastrar produto." });
  }
}

export async function atualizarProduto(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, descricao, valor, quantidade } = req.body;

  if (!nome || valor == null || quantidade == null) {
    return res.status(400).json({ error: "Preencha nome, valor e quantidade." });
  }

  if (quantidade < 0) {
    return res.status(400).json({ error: "Quantidade não pode ser negativa." });
  }

  const idProduto = Number(id);

  try {
    const query = `
      UPDATE produto 
      SET nome = ?, descricao = ?, valor = ?, quantidade = ?
      WHERE id = ?
    `;

    const [result]: any = await db.query(query, [nome, descricao, valor, quantidade, idProduto]);

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
      return res.status(404).json({ error: "Produto não encontrado ou já excluído." });
    }

    res.json({ mensagem: "Produto excluído com sucesso (soft delete)." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function buscarProduto(req: Request, res: Response) {
  const { id } = req.params;           // id via rota (ex: /produto/1)
  const { nome } = req.query;          // nome via query string (ex: /produto?nome=caneta)

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

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ produtos: rows });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}