'use client'
import { createContext, useReducer, useContext, useEffect } from 'react';
import { ToastContainer, Bounce } from "react-toastify";

const initialState = {
  isAuthenticated: false ,
  user: null ,
  jwt: null 
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
    case "SET_LOGGED_USER":
      return {...state,isAuthenticated:true, user:action.payload.user, jwt:action.payload.jwt}

  }
}


export default function Providers({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    const jwt = localStorage.getItem('jwt')

    if(!!jwt || !!user){
      dispatch({type:"SET_LOGGED_USER",payload:{user,jwt}})
    }
  }, []);

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