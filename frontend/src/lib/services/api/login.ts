import URL_BASE from "../api";

export async function handleLogin(email: string, senha: string): Promise<string | void> {
  try {
    const response = await fetch(`${URL_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      return `Erro na requisição: ${response.status} ${response.statusText}`;
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao realizar login:", error.message);
      return "Erro ao realizar login.";
    } else {
      return "Erro desconhecido ao realizar login.";
    }
  }
}