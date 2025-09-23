import { Request, Response } from "express";
import db from "../config/db";

export async function listarItensCompra(req: Request, res: Response) {
  const { compra_id } = req.params;

  try {
    const query = `
      SELECT * 
      FROM itens_compra 
      WHERE compra_id = ?
    `;
    const [rows]: any = await db.query(query, [compra_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Itens da compra não encontrados." });
    }

    res.json({ itens: rows });
  } catch (error) {
    console.error("Erro ao listar itens da compra:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function cadastrarItemCompra(req: Request, res: Response) {
  const { compra_id, produto_id, quantidade, preco_unitario } = req.body;

  if (!compra_id || !produto_id || quantidade == null || preco_unitario == null) {
    return res.status(400).json({ error: "Preencha compra_id, produto_id, quantidade e preco_unitario." });
  }

  try {
    const query = `
      INSERT INTO itens_compra (compra_id, produto_id, quantidade, preco_unitario)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(query, [compra_id, produto_id, quantidade, preco_unitario]);

    res.status(201).json({ mensagem: "Item de compra cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar item da compra:", error);
    res.status(500).json({ error: "Erro ao cadastrar item da compra." });
  }
}

export async function atualizarItemCompra(req: Request, res: Response) {
  const { id } = req.params;
  const { quantidade, preco_unitario } = req.body;

  if (quantidade == null || preco_unitario == null) {
    return res.status(400).json({ error: "Preencha quantidade e preco_unitario." });
  }

  const idItemCompra = Number(id);

  try {
    const query = `
      UPDATE itens_compra 
      SET quantidade = ?, preco_unitario = ?
      WHERE id = ?
    `;
    const [result]: any = await db.query(query, [quantidade, preco_unitario, idItemCompra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item da compra não encontrado." });
    }

    res.json({ mensagem: "Item da compra atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar item da compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function excluirItemCompra(req: Request, res: Response) {
  const { id } = req.params;
  const idItemCompra = Number(id);

  if (!idItemCompra) {
    return res.status(400).json({ error: "ID do item de compra inválido." });
  }

  try {
    const query = "DELETE FROM itens_compra WHERE id = ?";
    const [result]: any = await db.query(query, [idItemCompra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item da compra não encontrado." });
    }

    res.json({ mensagem: "Item da compra excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir item da compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function buscarItemCompra(req: Request, res: Response) {
  const { id } = req.params;
  const { compra_id, produto_id } = req.query;

  try {
    let query = "SELECT * FROM itens_compra WHERE 1 = 1";
    const params: any[] = [];

    if (id) {
      query += " AND id = ?";
      params.push(Number(id));
    }

    if (compra_id) {
      query += " AND compra_id = ?";
      params.push(Number(compra_id));
    }

    if (produto_id) {
      query += " AND produto_id = ?";
      params.push(Number(produto_id));
    }

    const [rows]: any = await db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item da compra não encontrado." });
    }

    res.json({ itens: rows });
  } catch (error) {
    console.error("Erro ao buscar item da compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}