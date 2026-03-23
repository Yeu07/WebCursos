'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAuth } from '@/src/components/Providers';

const Profile = () => {

  const searchParams = useSearchParams();
  const router = useRouter()
  const login_info = JSON.parse(searchParams.get('login_info') ?? '{}');
  const {dispatch} = useAuth();
  useEffect(() => {
  if (login_info) {
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
  )
}

export default Profile
