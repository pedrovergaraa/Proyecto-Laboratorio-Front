import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (mail, password) => {
    try {
      const response = await fetch('https://inmobiliariaaustral-1ba25c8cc0e8.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Captura el texto del error del backend
        throw new Error(`Login failed: ${errorText}`);
      }
  
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify({ mail: data.mail, token: data.token }));
      setUser({ mail: data.mail, token: data.token });
      setAuthError(null);
    } catch (error) {
      console.error("Error during login:", error.message); // Mostrar error más detallado
      setAuthError("Invalid mail or password.");
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