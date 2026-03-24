'use client'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from './Providers';

export default function Navbar() {
  const { isAuthenticated, user, dispatch } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setDropdownOpen(false);
    router.push('/Login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/Inicio" className="text-white font-bold text-lg tracking-tight hover:text-indigo-400 transition-colors">
          Web Cursos
        </Link>

        {mounted && (
          isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 
                           hover:border-indigo-500 transition-all duration-200 focus:outline-none
                           hover:shadow-lg hover:shadow-indigo-900/40"
              >
                {user?.pictureUrl ? (
                  <img src={user.pictureUrl} alt={user.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.[0]}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-xl shadow-black/40 overflow-hidden">
                  
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-white text-sm font-semibold truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { router.push('/profile'); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 
                                 hover:bg-gray-800 hover:text-white transition-colors text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 
                                 hover:bg-red-950/40 hover:text-red-300 transition-colors text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/Login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold 
                         px-4 py-2 rounded-lg transition-colors"
            >
              Iniciar sesión
            </Link>
          )
        )}
      </div>
    </nav>
  );
}