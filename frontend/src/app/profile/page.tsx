'use client'
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/src/components/Providers';
import { BookOpen, Mail, LogOut } from 'lucide-react';

export const dynamic = 'force-dynamic';

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dispatch, user, isAuthenticated } = useAuth();
  const login_info = JSON.parse(searchParams.get('login_info') ?? '{}');

  useEffect(() => {
    if (login_info?.user && login_info?.jwt) {
      dispatch({ type: 'LOGIN', payload: { user: login_info.user, jwt: login_info.jwt } });
      router.replace('/profile');
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  const displayUser = login_info?.user ?? user;

  if (!displayUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16">

        <div className="flex flex-col items-center text-center mb-12">
          {displayUser.pictureUrl ? (
            <img
              src={displayUser.pictureUrl}
              alt={displayUser.firstName}
              className="w-24 h-24 rounded-full border-4 border-indigo-600 shadow-xl shadow-indigo-900/40 mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold mb-4">
              {displayUser.firstName?.[0]}
            </div>
          )}
          <h1 className="text-3xl font-bold mb-1">
            {displayUser.firstName} {displayUser.lastName}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Mail size={14} />
            <span>{displayUser.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <BookOpen size={24} className="text-indigo-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-gray-400 text-sm mt-1">Cursos comprados</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <svg className="w-6 h-6 text-indigo-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-2xl font-bold">0</p>
            <p className="text-gray-400 text-sm mt-1">Videos vistos</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Cuenta</h2>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 
                       hover:bg-red-950/40 px-4 py-3 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}