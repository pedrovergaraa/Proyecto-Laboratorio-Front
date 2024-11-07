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

export const updateLandlord = async (landlord) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/${landlord.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(landlord),
    });
    if (!response.ok) {
      console.error('Error updating landlord:', response.status, response.statusText);
      throw new Error('Error updating landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating landlord:', error.message);
    throw error;
  }
};

export const deleteLandlord = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      console.error('Error deleting landlord:', response.status, response.statusText);
      throw new Error('Error deleting landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting landlord:', error.message);
    throw error;
  }
};
