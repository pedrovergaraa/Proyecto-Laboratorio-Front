import { createContext, useState } from "react";

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
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (mail, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();
      const decodedToken = parseJwt(data.token);

      if (!decodedToken) {
        throw new Error("Failed to decode token");
      }

      // Guardamos el token en localStorage
      localStorage.setItem("token", JSON.stringify(data.token));
      
      // Aquí puedes establecer el usuario con el email directamente desde la respuesta
      setUser({ mail: mail, ...decodedToken });
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

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError }}>
      {children}
    </AuthenticationContext.Provider>
  );
};