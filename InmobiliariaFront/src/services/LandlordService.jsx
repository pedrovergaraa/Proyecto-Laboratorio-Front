
const API_URL = 'http://localhost:8000';

// Obtener todos los landlords
export const fetchAllLandlords = async () => {
  try {
    const response = await fetch(`${API_URL}/landlords`);
    if (!response.ok) {
      throw new Error('Error fetching landlords');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching landlords:', error);
    throw error;
  }
};

// Crear un nuevo landlord
export const createLandlord = async (landlord) => {
  try {
    const response = await fetch(`${API_URL}/landlords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
