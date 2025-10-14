import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BarcodeScanner from "../../components/scanner/barcode";
import { useState } from "react";
import { getProdutoByCodigoBarras } from "../../lib/actions/produtoaction";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  // adicione outros campos que seu produto tem
}

export default function IniciarVenda() {
  const [isScannerOpen, setIsScannerOpen] = useState(true); // scanner ativo ao abrir
  const [lastCode, setLastCode] = useState<string | null>(null);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = async (code: string) => {
    console.log("Código lido:", code);
    setLastCode(code);
    setIsScannerOpen(false); // fecha o scanner
    setLoading(true);
    setError(null);
    setProduto(null);

    try {
      const response = await getProdutoByCodigoBarras(code);

      if (response.success) {
        setProduto(response.data);
      } else {
        setError(response.message || "Produto não encontrado.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar produto. : " + err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseScanner = () => {
    console.log("Scanner fechado pelo usuário");
    setIsScannerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />

      <main className="flex-grow px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Iniciar Venda
          </h2>

          {isScannerOpen ? (
            <BarcodeScanner
              onScanSuccess={handleScanSuccess}
              onClose={handleCloseScanner}
            />
          ) : (
            <div className="text-center">
              {lastCode && (
                <p className="text-green-600 font-medium mb-4">
                  Último código lido: {lastCode}
                </p>
              )}

              {loading && <p className="text-gray-600 mb-4">Carregando produto...</p>}

              {error && <p className="text-red-600 mb-4">{error}</p>}

              {produto && (
                <div className="bg-gray-100 p-4 rounded mb-4 text-left">
                  <p>
                    <strong>Nome:</strong> {produto.nome}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
                  </p>
                  {/* adicione outros campos aqui */}
                </div>
              )}

              <button
                onClick={() => setIsScannerOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {produto || error ? "Ler outro código" : "Iniciar Leitura"}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}