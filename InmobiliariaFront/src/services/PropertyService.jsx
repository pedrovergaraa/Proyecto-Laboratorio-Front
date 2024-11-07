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
export const fetchAllProperties = async () => {
  try {
    const response = await fetch(`${apiUrl}/property/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching properties: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const createProperty = async (property) => {
  console.log("propertyService",property)
  try {
    const response = await fetch(`${apiUrl}/property/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error(`Error creating property: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};


export const updateProperty = async (property) => {
  try {
    const response = await fetch(`${apiUrl}/property/${property.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    if (!response.ok) {
      throw new Error(`Error updating property: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};


export const deleteProperty = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/property/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error deleting property: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};