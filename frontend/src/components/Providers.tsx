'use client'
import { createContext, useReducer, useContext } from 'react';
import { ToastContainer, Bounce } from "react-toastify";

const getLoginInfo = (entity: string) => {
  if (typeof window === "undefined") return null;  
  const item = localStorage.getItem(entity);
  if (!item) return null; 
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}
const initialState = {
  isAuthenticated: !!getLoginInfo('jwt'),
  user: getLoginInfo('user'),
  jwt: getLoginInfo('jwt')
}

export const AuthContext = createContext<any>(initialState);

const reducer = (state: any, action: any) => {
  switch(action.type){
    case "LOGIN":
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('jwt', JSON.stringify(action.payload.jwt))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        jwt: action.payload.jwt
      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        jwt: null
      }
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);