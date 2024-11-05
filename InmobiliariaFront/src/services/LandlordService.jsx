const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (!tokenData || !tokenData.token) {
    throw new Error("No token found");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenData.token}`,
  };
};


// Obtener todos los landlords
export const fetchAllLandlords = async () => {
  try {
    const response = await fetch(`${apiUrl}/landlord/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      console.error('Error fetching landlords:', response.status, response.statusText);
      throw new Error('Error fetching landlords');
    }
    const data = await response.json();

    return data.map(landlord => ({
      id: landlord.id,
      mail: landlord.mail,
      propertyList: landlord.propertyList || [],
    }));
  } catch (error) {
    console.error('Error fetching landlords:', error.message);
    throw error;
  }
};

// Los demás métodos (createLandlord, fetchLandlordById, updateLandlord, deleteLandlord) permanecen igual
