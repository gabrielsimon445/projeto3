import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/firebaseconfig";

const JWT_SECRET = "sua_chave_secreta";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const usuarioSnapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (usuarioSnapshot.empty) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const usuarioDoc = usuarioSnapshot.docs[0];
    const usuario = { id: usuarioDoc.id, ...usuarioDoc.data() } as any;

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}