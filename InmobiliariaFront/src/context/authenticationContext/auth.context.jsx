import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

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
    <AuthenticationContext.Provider value={{ user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
