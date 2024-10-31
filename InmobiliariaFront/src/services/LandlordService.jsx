const apiUrl = import.meta.env.VITE_API_URL;
// Obtener todos los landlords
export const fetchAllLandlords = async () => {
  try {
    const response = await fetch(`${apiUrl}/landlord/all`);
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
    const response = await fetch(`${apiUrl}/landlord/new`, {
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
