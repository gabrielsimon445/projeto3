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
    const query = "INSERT INTO produto (nome, descricao, valor, quantidade) VALUES (?, ?, ?, ?)";
    await db.query(query, [nome, descricao, valor, quantidade]);

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