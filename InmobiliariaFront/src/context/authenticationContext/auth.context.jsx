




// import { createContext, useState, useEffect } from "react";

// const parseJwt = (token) => {
//   try {
//     const base64Url = token.split('.')[1]; 
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload); 
//   } catch (e) {
//     console.error("Error decoding JWT:", e);
//     return null;
//   }
// };

// export const AuthenticationContext = createContext();

// const apiUrl = import.meta.env.VITE_API_URL;

// export const AuthenticationContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authError, setAuthError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = parseJwt(JSON.parse(token));
//       if (decodedToken) {
//         setUser({ mail: decodedToken.mail, ...decodedToken });
//       }
//     }
//   }, []);



//   const handleLogin = async (mail, password) => {
//     try {
//       const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mail, password }),
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Login failed: ${errorText}`);
//       }
  
//       const data = await response.json();
//       const decodedToken = parseJwt(data.token);
  
//       if (!decodedToken) {
//         throw new Error("Failed to decode token");
//       }
  
//       localStorage.setItem("token", JSON.stringify(data.token));
//       localStorage.setItem("mail", mail);  // Guardar el mail en el localStorage
//       setUser({ mail, ...decodedToken });
//       setAuthError(null);
//     } catch (error) {
//       console.error("Error during login:", error);
//       setAuthError("Invalid mail or password.");
//     }
//   };
  

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError }}>
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };








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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedMail = localStorage.getItem("mail");  // Recuperar el mail del localStorage
    if (token) {
      const decodedToken = parseJwt(JSON.parse(token));
      if (decodedToken) {
        setUser({ mail: storedMail, ...decodedToken });  // Usar el mail guardado junto con el token decodificado
      }
    }
  }, []);

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

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("mail", mail);  // Guardar el mail en el localStorage
      setUser({ mail, ...decodedToken });
      setAuthError(null);
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("Invalid mail or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mail");  // Eliminar el mail del localStorage al cerrar sesión
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, authError }}>
      {children}
    </AuthenticationContext.Provider>
  );
};







