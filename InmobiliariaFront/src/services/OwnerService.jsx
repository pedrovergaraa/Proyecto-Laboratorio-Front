// src/services/OwnerService.js
const apiUrl = 'https://inmobiliariaaustral-1ba25c8cc0e8.herokuapp.com/owner';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchAllOwners = async () => {
  const response = await fetch(`${apiUrl}/all`, { headers: getAuthHeaders() });
  if (!response.ok) {
    throw new Error('Error fetching owners');
  }
  return await response.json();
};

export const createOwner = async (ownerData) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(ownerData),
  });
  if (!response.ok) {
    throw new Error('Error creating owner');
  }
  return await response.json();
};

export const updateOwner = async (id, ownerData) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(ownerData),
  });
  if (!response.ok) {
    throw new Error('Error updating owner');
  }
  return await response.json();
};

export const deleteOwner = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Error deleting owner');
  }
  return await response.json();
};
