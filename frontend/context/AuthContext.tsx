// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const isAuthenticated = !!token;
//   const login = (token) => {
//     setToken(token);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useState, ReactNode } from "react";

// type AuthContextType = {
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined,
// );

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [token, setToken] = useState<string | null>(null);

//   const isAuthenticated = !!token;

//   const login = (token: string) => {
//     setToken(token);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";
// import * as SecureStore from "expo-secure-store";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const isAuthenticated = !!token;

//   const login = async (newToken) => {
//     await SecureStore.setItemAsync("token", newToken);
//     setToken(newToken);
//   };

//   const logout = async () => {
//     await SecureStore.deleteItemAsync("token");
//     setToken(null);
//   };

//   useEffect(() => {
//     const loadToken = async () => {
//       const storedToken = await SecureStore.getItemAsync("token");
//       if (storedToken) {
//         setToken(storedToken);
//       }
//       setLoading(false);
//     };

//     loadToken();
//   }, []);

//   if (loading) return null;

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  login: async (token: string) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  const login = async (newToken: string) => {
    try {
      await SecureStore.setItemAsync("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
    } catch (error) {
      console.log("Error deleting token:", error);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log("Error loading token:", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // Show nothing while checking token
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
