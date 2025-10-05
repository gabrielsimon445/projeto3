"use client";

import { atualizarProduto, cadastrarProduto, deletarProduto, getProdutoBy } from "../services/api/produto";
import { ProdutoSchema } from "../validation/produtoschema";


export const submitProduto = async (data: ProdutoSchema) => {
  console.log('d', data)  
  try {
        const resultado = await cadastrarProduto({
          nome: data.nome,
          descricao: data.descricao ?? "",
          tipo: data.tipo,
          codigoBarras: data.codigoBarras,
          preco: data.preco
        });

        if (resultado && resultado.mensagem) {
          return { success: true, message: "Produto cadastrado com sucesso!" };
        }

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return { success: false, message: "Erro ao cadastrar produto." };
    }
};

export const updateProduto = async (id: number, data: ProdutoSchema) => {
  try {
    const resultado = await atualizarProduto({
      id,
      nome: data.nome,
      descricao: data.descricao ?? "",
      tipo: data.tipo,
      codigoBarras: data.codigoBarras,
      preco: data.preco,
    });

    if (resultado && resultado.mensagem) {
      return { success: true, message: "Produto atualizado com sucesso!" };
    }

    return { success: false, message: "Erro ao atualizar produto." };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { success: false, message: "Erro ao atualizar produto." };
  }
};

export const deleteProduto = async (id: number) => {
  try {
    const resultado = await deletarProduto(id);

    if (resultado && resultado.success) {
      return { success: true, message: resultado.message ?? "Produto excluído com sucesso!" };
    }

    return { success: false, message: "Erro ao excluir produto." };
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return { success: false, message: "Erro ao excluir produto." };
  }
};

export const getProdutoById = async (id: number) => {
  try {
    const produto = await getProdutoBy(id);

    if (produto) {
      return { success: true, data: produto };
    }

    return { success: false, message: "Produto não encontrado." };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return { success: false, message: "Erro ao buscar produto." };
  }
};