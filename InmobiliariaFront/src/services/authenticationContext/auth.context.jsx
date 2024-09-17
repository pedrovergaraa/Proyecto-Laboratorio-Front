import { createContext, useState } from "react";
import { loginUser } from "../../services/UserServiceTest"; // Asegúrate de que esta ruta es correcta

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password); // Llamada a la función del servicio

      // Guarda más información del usuario si es necesario (por ejemplo, el token)
      localStorage.setItem("user", JSON.stringify({ email: data.email, token: data.token }));
      setUser({ email: data.email, token: data.token }); // Actualiza el estado del usuario con más información si es necesario
      setAuthError(null); // Limpia los errores de autenticación previos
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError }}>
      {children}
    </AuthenticationContext.Provider>
  );
};