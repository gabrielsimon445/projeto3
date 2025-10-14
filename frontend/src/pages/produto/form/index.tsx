import { useEffect, useState } from "react";
import Header from "../../../components/header";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useForm } from "react-hook-form";
import {
  produtoSchema,
  ProdutoSchema,
} from "../../../lib/validation/produtoschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProdutoById, submitProduto, updateProduto } from "../../../lib/actions/produtoaction";
import ActionBar from "../../../components/actionBar";
import { useNavigate, useParams } from "react-router-dom";
export default function ProdutoForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoSchema>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: undefined,
      codigoBarras: "",
      preco: 0.0,
    },
  });

  useEffect(() => {
    if (!id) return;

    getProdutoById(Number(id))
      .then((data) => reset(data.data))
      .catch(() => setError("Erro ao carregar dados do produto."));
  }, [id, reset]);

  const onSubmit = async (data: ProdutoSchema) => {
    setError(null);
    setSuccess(null);

    try {
      let result;
      if (id) {
        result = await updateProduto(Number(id), data);
      } else {
        result = await submitProduto(data);
      }

      if (result && result.success) {
        setSuccess(result.message ?? "Operação realizada com sucesso.");
        navigate("/produtos");
      } else {
        setError("Erro ao salvar produto.");
      }
    } catch (e) {
      setError("Erro ao processar a solicitação.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Cadastro de Produto
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                {...register("nome")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              {errors.nome && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                {...register("descricao")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              {errors.descricao && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.descricao.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                {...register("tipo")}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                <option value="UNIDADE">Unidade</option>
                <option value="VOLUME">Volume</option>
                <option value="LITROS">Litros</option>
              </select>
              {errors.tipo && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.tipo.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código de Barras
              </label>
              <input
                type="text"
                {...register("codigoBarras")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              {errors.codigoBarras && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.codigoBarras.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                step="0.01"
                {...register("preco", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
              {errors.preco && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.preco.message}
                </p>
              )}
            </div>
            <div className="pt-4">
              <ActionBar
                onAdd={handleSubmit(onSubmit)}
                addLabel={isSubmitting ? "Salvando..." : "Salvar"}
                showEdit={false}
                showDelete={false}
              />
            </div>
          </form>
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-sm text-green-600">{success}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}