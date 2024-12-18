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

export const createOwner = async (owner) => {
  try {
    const response = await fetch(`${apiUrl}/owner/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(owner),
    });
    if (!response.ok) {
      throw new Error(`Error creating owner: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating owner:', error);
    throw error;
  }
};

export const fetchAllOwners = async () => {
  try {
    const response = await fetch(`${apiUrl}/owner/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching owners: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};

export const updateOwner = async (owner) => {
  try {
    const response = await fetch(`${apiUrl}/owner/${owner.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(owner),
    });
    if (!response.ok) {
      throw new Error(`Error updating owner: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating owner:', error);
    throw error;
  }
};

export const deleteOwner = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/owner/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error deleting owner: ${response.statusText}`);
    }
    return true; 
  } catch (error) {
    console.error('Error deleting owner:', error);
    throw error;
  }
};

