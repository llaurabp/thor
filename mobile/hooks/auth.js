import React, { createContext, useCallback, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = AsyncStorage.getItem('@Zeus:token');
   

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
    AsyncStorage.setItem('@Zeus:token', token);
    
    setData({ token });

  }, []);
  
  const signOut = useCallback(() => {
    AsyncStorage.removeItem('@Zeus:token');
    AsyncStorage.removeItem('@Zeus:name');
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
