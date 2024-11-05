const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    throw new Error("No token found");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};


// Obtener todos los landlords
export const fetchAllLandlords = async () => {
  try {
    const response = await fetch(`${apiUrl}/landlord/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching landlords');
    }
    const data = await response.json();

    // Adaptar los datos si es necesario
    return data.map(landlord => ({
      id: landlord.id,
      mail: landlord.mail,
      propertyList: landlord.propertyList || [], // Asegúrate de que existe
    }));
  } catch (error) {
    console.error('Error fetching landlords:', error);
    throw error;
  }
};

// Crear un nuevo landlord
export const createLandlord = async (landlord) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(landlord),
    });
    if (!response.ok) {
      throw new Error('Error creating landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating landlord:', error);
    throw error;
  }
};

// Obtener un landlord por ID
export const fetchLandlordById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching landlord by ID:', error);
    throw error;
  }
};

// Actualizar un landlord
export const updateLandlord = async (id, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Error updating landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating landlord:', error);
    throw error;
  }
};

// Eliminar un landlord
export const deleteLandlord = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error deleting landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting landlord:', error);
    throw error;
  }
};
