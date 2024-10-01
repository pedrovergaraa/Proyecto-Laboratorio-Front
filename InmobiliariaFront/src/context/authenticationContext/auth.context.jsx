import { createContext, useState } from "react";
import { loginUser } from "../../services/UserServiceTest"; 

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password); 

      localStorage.setItem("user", JSON.stringify({ email: data.email, token: data.token }));
      setUser({ email: data.email, token: data.token }); 
      setAuthError(null); 
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