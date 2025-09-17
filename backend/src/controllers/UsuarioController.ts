import { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcrypt";

export async function listarUsuarios(req: Request, res: Response) {
  const [rows] = await db.query("SELECT id, nome, email FROM usuario");
  res.json(rows);
}

export async function criarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const [result] = await db.query(
    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaCriptografada]
  );

  res.status(201).json({ id: (result as any).insertId, nome, email });
}

export async function ativaDesativaUsuario(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // Primeiro, buscar o usuário para verificar se existe e pegar o status atual
    const [rows]: any = await db.query("SELECT ativo FROM usuario WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const statusAtual = rows[0].ativo;
    const novoStatus = statusAtual ? 0 : 1;

    await db.query("UPDATE usuario SET ativo = ? WHERE id = ?", [novoStatus, id]);

    res.json({ mensagem: `Usuário ${novoStatus ? "ativado" : "desativado"} com sucesso.` });
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function atualizarUsuario(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  try {
    let senhaCriptografada;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const query = senha
      ? "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?"
      : "UPDATE usuario SET nome = ?, email = ? WHERE id = ?";

    const params = senha
      ? [nome, email, senhaCriptografada, id]
      : [nome, email, id];

    const [result]: any = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}