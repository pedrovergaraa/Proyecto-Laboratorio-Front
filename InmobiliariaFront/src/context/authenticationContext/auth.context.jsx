import { createContext, useState, useEffect } from "react";

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload); 
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

  // Obtener el token del localStorage cuando el componente se monta
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedMail = localStorage.getItem("mail");  // Recuperar el mail del localStorage
    if (token) {
      const decodedToken = parseJwt(JSON.parse(token));
      if (decodedToken) {
        setUser({ mail: storedMail, ...decodedToken, role: decodedToken.role });  // Usar el mail guardado junto con el token decodificado
      }
    }
  }, []);

  // Función para obtener los encabezados de autenticación
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    return {
      "Authorization": `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };
  };

  // Manejo del login
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

      // Decodificar el token y verificar
      const decodedToken = parseJwt(data.token);
      if (!decodedToken) {
        throw new Error("Failed to decode token");
      }

      // Guardar el token y otros datos en localStorage
      localStorage.setItem("token", JSON.stringify(data.token));  // Guardar token en localStorage
      localStorage.setItem("mail", mail);  // Guardar el mail en localStorage
      localStorage.setItem("role", decodedToken.role); // Almacenar el rol del usuario

      // Establecer el usuario en el estado
      setUser({ mail, ...decodedToken, role: decodedToken.role });

      setAuthError(null);
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("Invalid mail or password.");
    }
  };

  // Manejo del logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("role");  // Eliminar el rol del localStorage al cerrar sesión
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError, getAuthHeaders }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
