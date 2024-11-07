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
const verifiedUser = () => {
  const token = localStorage.getItem("token");
  const mail = localStorage.getItem("mail");

  if (token) {
    const decodedToken = parseJwt(JSON.parse(token));

    if (decodedToken) {
      return { mail: mail ,...decodedToken };
    }
    else{
      return null
    }
}}


export const AuthenticationContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(verifiedUser)
  const [authError, setAuthError] = useState(null);

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

      const decodedToken = parseJwt(data.token);
      if (!decodedToken) {
        throw new Error("Failed to decode token");
      }

      localStorage.setItem("token", JSON.stringify(data.token));  
      localStorage.setItem("mail", mail);  
      localStorage.setItem("role", decodedToken.role); 

    
      setUser({ mail, ...decodedToken, role: decodedToken.role });

      setAuthError(null);
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("Invalid mail or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("role");  
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError, getAuthHeaders }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
