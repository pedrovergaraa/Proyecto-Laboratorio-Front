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
export const fetchAllLandlords = async () => {
  try {
    const response = await fetch(`${apiUrl}/landlord/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching landlords: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching landlords:', error);
    throw error;
  }
};

export const createLandlord = async (landlord) => {
  try {
    const response = await fetch(`${apiUrl}/landlord/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(landlord),
    });

    if (!response.ok) {
      console.error('Error creating landlord:', response.status, response.statusText);
      throw new Error('Error creating landlord');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating landlord:', error.message);
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
      throw new Error(`Error deleting landlord: ${response.statusText}`);
    }
    return true; 
  } catch (error) {
    console.error('Error deleting landlord:', error);
    throw error;
  }
};
