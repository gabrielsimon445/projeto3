export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-2 flex justify-center gap-6">
      <a href="/" className="hover:underline">Home</a>
      <a href="/login" className="hover:underline">Login</a>
    </nav>
  );
}