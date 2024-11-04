// src/services/OwnerService.js
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

// CRUD para Owner
export const createOwner = async (owner) => {
  return await makeRequest(`${apiUrl}/owner/new`, 'POST', owner);
};

export const updateOwner = async (owner) => {
  return await makeRequest(`${apiUrl}/owner/${owner.id}`, 'PUT', owner);
};

export const deleteOwner = async (id) => {
  return await makeRequest(`${apiUrl}/owner/${id}`, 'DELETE');
};

// Obtener todos los owners
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

// Helper para simplificar las llamadas a la API
const makeRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : null,
    });
    if (!response.ok) {
      throw new Error(`Error ${method} data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
};
