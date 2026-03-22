import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Web Cursos
        </Link>

        <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          Iniciar sesión
        </button>

      </div>
    </nav>
  );
}