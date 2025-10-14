import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

export default function ProcessoVenda() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/iniciar-venda");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-grow px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Processo de Venda</h2>
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200"
            >
              Iniciar Nova Venda
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
