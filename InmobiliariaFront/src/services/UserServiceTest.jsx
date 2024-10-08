const API_URL = 'http://localhost:8000';

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Autenticar un usuario
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {  // Suponiendo que tengas un endpoint `/login` configurado en tu FakeAPI
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Envía las credenciales al servidor
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Aquí puedes manejar el token de autenticación o la información del usuario que viene de la respuesta
    return data; // Devuelve la respuesta del servidor que podría incluir un token de autenticación
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
