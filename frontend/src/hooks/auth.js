import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Zeus:token');
   

    if(token ) {
      return { token };
    }

    return {};
  })
  
  const signIn = useCallback( async ({ email, senha}) => {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });
    
    
    const { token } = response.data;
    localStorage.setItem('@Zeus:token', token);
    
    setData({ token });
    
    return !!token

  }, []);
  
  const signOut = useCallback(() => {
    localStorage.removeItem('@Zeus:token');
    // localStorage.removeItem('@Zeus:name');
    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{  signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
