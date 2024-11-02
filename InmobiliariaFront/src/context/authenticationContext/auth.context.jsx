import { createContext, useState } from "react";


export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("token"));

const apiUrl = import.meta.env.VITE_API_URL;


export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
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
        const errorText = await response.text(); // Captura el texto del error del backend
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

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError  }}>
      {children}
    </AuthenticationContext.Provider>
  );
};