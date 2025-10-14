import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState } from 'react';
import { handleLogin } from '../../lib/services/api/login';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(null);
    setLoading(true);

    try {
      await handleLogin(email, senha);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 flex items-center justify-center ">
        <div className="w-80 h-800 p-8 bg-blue-500 rounded-lg shadow flex flex-col border-2 border-blue-800 ">
          <h2 className="text-xl font-semibold bg-blue-500 mb-16 text-center text-white">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1  ">
            <input
              type="text"
              placeholder="Usuário"
              className="p-2 border-2 border-blue-800 border rounded mb-4"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className=" p-2 border-2 border-blue-800 rounded mb-16"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <div className="flex-1" />
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-bold mt-4 disabled:opacity-50 border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          {mensagem && (
            <p className="mt-4 text-center text-red-600">{mensagem}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}