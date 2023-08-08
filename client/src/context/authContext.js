import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../queries/userInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token;
  });

  const { data } = useQuery(USER_INFO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("user context", data);

  useEffect(() => {
    if (token) {
      setUser(data?.user);
    }
  }, [token, data]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logout,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
