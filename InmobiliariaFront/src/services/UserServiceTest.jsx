  const apiUrl = import.meta.env.VITE_API_URL;

  export const getUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/all`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  };


  export const createUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/register/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  export const loginUser = async (mail, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json(); 
      return data; 
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

