import { z } from "zod";
export const produtoSchema = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, "Nome é obrigatório"),
    descricao: z.string().optional(),
    tipo: z.string(),
    codigoBarras: z.string().min(1, "Código de barras é obrigatório"),
    preco: z.number().min(0, "Preço deve ser um valor positivo")
});

export type ProdutoSchema = z.infer<typeof produtoSchema>;