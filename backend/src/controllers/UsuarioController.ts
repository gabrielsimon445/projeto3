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

