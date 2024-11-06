import { createContext, useState, useEffect } from "react";

// Función para decodificar el JWT sin usar una librería externa
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Tomamos la segunda parte, que es el payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Ajustes para Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload); // Convertimos el JSON codificado en el payload
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
};

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

      // Almacena el rol junto al token
      localStorage.setItem("token", JSON.stringify({ token: data.token, role: data.role }));
      setUser({ token: data.token, role: data.role }); // Guarda el rol en el estado
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