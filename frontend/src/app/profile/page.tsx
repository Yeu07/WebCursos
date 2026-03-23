'use client'
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/src/components/Providers';

export const dynamic = 'force-dynamic';

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dispatch } = useAuth();
  const login_info = JSON.parse(searchParams.get('login_info') ?? '{}');

  useEffect(() => {
    if (login_info?.user && login_info?.jwt) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user: login_info.user,
          jwt: login_info.jwt
        }
      });
      router.replace('/profile');
    }
  }, []);

  return (
    <div>
      Perfil
    </div>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProfileContent />
    </Suspense>
  );
}