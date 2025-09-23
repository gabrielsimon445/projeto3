import { Request, Response } from "express";
import db from "../config/db";

export async function listarCompras(req: Request, res: Response) {
  try {
    const [rows]: any = await db.query("SELECT * FROM compras");

    res.json({ compras: rows });
  } catch (error) {
    console.error("Erro ao listar compras:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function cadastrarCompra(req: Request, res: Response) {
  const { usuario_id, total, status } = req.body;

  if (!usuario_id || total == null || !status) {
    return res.status(400).json({ error: "Preencha usuario_id, total e status." });
  }

  try {
    const query = `
      INSERT INTO compras (usuario_id, total, status)
      VALUES (?, ?, ?)
    `;
    await db.query(query, [usuario_id, total, status]);

    res.status(201).json({ mensagem: "Compra cadastrada com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar compra:", error);
    res.status(500).json({ error: "Erro ao cadastrar compra." });
  }
}

export async function atualizarCompra(req: Request, res: Response) {
  const { id } = req.params;
  const { usuario_id, total, status } = req.body;

  if (!usuario_id || total == null || !status) {
    return res.status(400).json({ error: "Preencha usuario_id, total e status." });
  }

  const idCompra = Number(id);

  try {
    const query = `
      UPDATE compras 
      SET usuario_id = ?, total = ?, status = ?
      WHERE id = ?
    `;
    const [result]: any = await db.query(query, [usuario_id, total, status, idCompra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Compra não encontrada." });
    }

    res.json({ mensagem: "Compra atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function excluirCompra(req: Request, res: Response) {
  const { id } = req.params;
  const idCompra = Number(id);

  if (!idCompra) {
    return res.status(400).json({ error: "ID da compra inválido." });
  }

  try {
    const query = "DELETE FROM compras WHERE id = ?";
    const [result]: any = await db.query(query, [idCompra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Compra não encontrada." });
    }

    res.json({ mensagem: "Compra excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function buscarCompra(req: Request, res: Response) {
  const { id } = req.params;
  const { usuario_id, status } = req.query;

  try {
    let query = "SELECT * FROM compras WHERE 1 = 1";
    const params: any[] = [];

    if (id) {
      query += " AND id = ?";
      params.push(Number(id));
    }

    if (usuario_id) {
      query += " AND usuario_id = ?";
      params.push(Number(usuario_id));
    }

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    const [rows]: any = await db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Compra não encontrada." });
    }

    res.json({ compras: rows });
  } catch (error) {
    console.error("Erro ao buscar compra:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}