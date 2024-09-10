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
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const loginUser = async (dni, password) => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const users = await response.json();
    const user = users.find(user => user.dni === dni && user.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
