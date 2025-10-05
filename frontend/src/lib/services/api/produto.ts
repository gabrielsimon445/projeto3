import { Produto } from "../../../types/produto";
import URL_BASE from "../api";

export async function listarProdutos() {
  try {
    const response = await fetch(`${URL_BASE}/listarProdutos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export async function cadastrarProduto(produto: Produto) {
  try {
    const response = await fetch(`${URL_BASE}/criarProduto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produto)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}

export async function atualizarProduto(produto: Produto) {
  try {
    const response = await fetch(`${URL_BASE}/atualizarProduto/${produto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produto)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}

export async function deletarProduto(id: number) {
  try {
    const response = await fetch(`${URL_BASE}/excluirProduto/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    return { success: true, message: "Produto excluído com sucesso!" };

  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
}

export async function getProdutoBy(id: number) {
  try {
    const response = await fetch(`${URL_BASE}/procurarProduto/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok)
      throw new Error(`Erro ao buscar produto: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.produtos?.[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    throw error;
  }
}