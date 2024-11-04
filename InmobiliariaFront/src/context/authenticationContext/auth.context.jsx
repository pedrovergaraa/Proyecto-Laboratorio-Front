import { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token: JSON.parse(token) } : null;
  });
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (mail, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();

      localStorage.setItem("token", JSON.stringify(data.token));
      setUser({ token: data.token });
      setAuthError(null);
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("Invalid mail or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // useEffect para cargar el token desde localStorage en el montaje del componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token: JSON.parse(token) });
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
