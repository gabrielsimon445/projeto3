import { useState, useEffect } from "react";
import { Produto } from "../../../types/produto";
import Header from "../../../components/header";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ActionBar from "../../../components/actionBar";
import { listarProdutos } from "../../../lib/services/api/produto";
import { useNavigate } from "react-router-dom";
import { deleteProduto } from "../../../lib/actions/produtoaction";

export default function ProdutosList() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true);
      const data = await listarProdutos();
      console.log(data);
      setProdutos(data.produtos || []);
      console.log("asdad", produtos);
      setLoading(false);
    }
    fetchProdutos();
  }, []);

  const handleEdit = (produto: Produto) => {
    navigate(`/produtos/${produto.id}`);
  };

  const handleDelete = async (produto: Produto) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
      return;
    }

    try {
      const result = await deleteProduto(Number(produto.id));

      if (result.success) {
        setProdutos((prev) => prev.filter((p) => p.id !== produto.id));
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto.");
    }
  };

  const handleAdd = () => {
    navigate("/produtos/novo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-grow px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Lista de Produtos
        </h2>
        <button
          onClick={handleAdd}
          className="mt-2 mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Adicionar Produto
        </button>
        {loading ? (
          <p className="text-center text-gray-500">Carregando produtos...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {produto.nome}
                  </h3>
                  <p className="text-sm text-gray-600">{produto.descricao}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Tipo:</span> {produto.tipo}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Código de Barras:</span>{" "}
                    {produto.codigoBarras}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Preço:</span> R${" "}
                    {Number(produto.preco).toFixed(2)}
                  </p>
                </div>
                <div className="pt-4">
                  <ActionBar
                    onEdit={() => handleEdit(produto)}
                    onDelete={() => handleDelete(produto)}
                    showAdd={false}
                    addLabel=""
                    editLabel="Editar"
                    deleteLabel="Excluir"
                  />
                </div>
              </div>
            ))}
            {produtos.length === 0 && (
              <p className="col-span-full text-center text-gray-500 mt-6">
                Nenhum produto cadastrado.
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
