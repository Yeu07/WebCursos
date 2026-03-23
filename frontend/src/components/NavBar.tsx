'use client'
import Link from "next/link";
import { getAuth } from "../services/authServices";
import { useAuth } from '@/src/components/Providers';

export default function Navbar() {

  const { isAuthenticated, dispatch } = useAuth();

  const handleLogin = async () => {
    const response = await getAuth()
  }

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Web Cursos
        </Link>

        { !isAuthenticated && <button onClick={handleLogin} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          Iniciar sesión
        </button>}

        { isAuthenticated && <button onClick={handleLogout} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          Cerrar sesión
        </button>}

      </div>
    </nav>
  );
}