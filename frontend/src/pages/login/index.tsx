import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Login() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-blue-50 rounded-lg shadow flex flex-col">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">Login</h2>
          <form className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="Usuário"
              className="p-2 border border-blue-400 rounded mb-4"
            />
            <input
              type="password"
              placeholder="Senha"
              className="p-2 border border-blue-400 rounded mb-4"
            />
            <div className="flex-1" />
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-bold mt-4"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}