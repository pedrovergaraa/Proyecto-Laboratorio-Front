const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Obtener todas las propiedades
export const fetchAllProperties = async () => {
  try {
    const response = await fetch(`${apiUrl}/property/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching properties');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Crear una nueva propiedad
export const createProperty = async (property) => {
  try {
    const response = await fetch(`${apiUrl}/property/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error('Error creating property');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

// Actualizar una propiedad existente
export const updateProperty = async (property) => {
  try {
    const response = await fetch(`${apiUrl}/property/${property.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error('Error updating property');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// Eliminar una propiedad
export const deleteProperty = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/property/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error deleting property');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};
