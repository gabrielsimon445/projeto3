import React from 'react';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// Define the type for cart items
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function Compras() {
  // Explicitly type the cartItems array
  const cartItems: CartItem[] = [
    { id: 1, name: 'Produto A', quantity: 2, price: 50.00 },
    { id: 2, name: 'Produto B', quantity: 1, price: 100.00 },
  ];

  // Calculate total, removing the extra argument in reduce
  const total: number = cartItems.reduce((acc: number, item: CartItem) => acc + (item.quantity * item.price), 0);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-blue-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Compras</h2>
          
          {/* Itens do carrinho */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Carrinho</h3>
            {cartItems.length === 0 ? (
              <p className="text-blue-900">Carrinho vazio.</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between text-blue-900">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>R$ {(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between font-bold text-blue-900">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Botão Continuar com a Compra */}
          <button className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mb-6">
            Continuar com a Compra
          </button>

          {/* Opções de pagamento */}
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">Pagamento</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-100 text-blue-900 font-medium py-2 px-4 rounded hover:bg-blue-200 transition duration-200">
                Cartão de Crédito
              </button>
              <button className="bg-blue-100 text-blue-900 font-medium py-2 px-4 rounded hover:bg-blue-200 transition duration-200">
                Cartão de Débito
              </button>
              <button className="bg-blue-100 text-blue-900 font-medium py-2 px-4 rounded hover:bg-blue-200 transition duration-200">
                Pix
              </button>
              <button className="bg-blue-100 text-blue-900 font-medium py-2 px-4 rounded hover:bg-blue-200 transition duration-200">
                Transferência
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}