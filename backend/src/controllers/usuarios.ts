import { Request, Response } from "express";
import db from "../db";

export async function listarUsuarios(req: Request, res: Response) {
  const [rows] = await db.query("SELECT id, nome, email FROM usuarios");
  res.json(rows);
}

export async function criarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;
  const [result] = await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha]
  );
  res.status(201).json({ id: (result as any).insertId, nome, email });
}