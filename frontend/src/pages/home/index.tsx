import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Home() {
  const options = [
    'Clientes',
    'Compras',
    'Representantes',
    'Consultas',
    'Comunicação',
    'Mensagens',
    'Produtos',
    'Ferramentas',
    'Informações'
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-blue-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">Página Inicial</h2>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-100 text-blue-900 font-medium py-10 px-4  rounded hover:bg-blue-200 transition duration-200 "
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}