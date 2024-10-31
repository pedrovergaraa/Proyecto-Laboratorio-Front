  const apiUrl = import.meta.env.VITE_API_URL;
  // Obtener todos los usuarios
  export const getUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Puedes manejar el error en el lugar donde llamas a esta función
    }
  };

  // Crear un nuevo usuario (Registro)
  export const createUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Envía el nuevo usuario al backend
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      return await response.json(); // Retorna la respuesta del backend
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // Autenticar un usuario (Login)
  export const loginUser = async (mail, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }), // Enviar mail y password
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json(); // Obtén la respuesta en formato JSON
      return data; // Devuelve la respuesta, que puede incluir el token o info del usuario
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

