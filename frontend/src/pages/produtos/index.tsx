import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Navbar from '../../components/navbar';

export const Produtos = () => {
    // Dados dos produtos (simulando como na imagem)
    const produtos = [
        {
            id: 1,
            nome: "Smartphone XYZ Pro",
            avaliacao: 4.8,
            imagem: "https://via.placeholder.com/80x120?text=Smartphone", // Ícone genérico
        },
        {
            id: 2,
            nome: "Tablet Pro Elite",
            avaliacao: 4.5,
            imagem: "https://via.placeholder.com/80x120?text=Tablet",
        },
        {
            id: 3,
            nome: "Notebook Gamer Elite",
            avaliacao: 4.9,
            imagem: "https://via.placeholder.com/80x120?text=Notebook",
        },
    ];

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-blue-50 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">Produtos</h2>

                    {/* Grid responsivo: 2 colunas em desktop, 1 coluna em mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {produtos.map((produto) => (
                            <div
                                key={produto.id}
                                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Imagem do produto */}
                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    className="w-16 h-24 object-cover rounded"
                                />

                                {/* Informações do produto */}
                                <div className="flex-1">
                                    <h3 className="font-medium text-blue-800">{produto.nome}</h3>
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-500 text-sm">★★★★★</span>
                                        <span className="text-gray-600 text-xs ml-1">({produto.avaliacao})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}