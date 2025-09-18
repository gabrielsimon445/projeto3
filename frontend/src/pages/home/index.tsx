import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-blue-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Página Inicial</h2>
          <p className="text-blue-900">Em desenvolvimento</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}