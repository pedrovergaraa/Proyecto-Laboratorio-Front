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

// CRUD para Property
export const createProperty = async (property) => {
  return await makeRequest(`${apiUrl}/property/new`, 'POST', property);
};
export const updateProperty = async (property) => {
  return await makeRequest(`${apiUrl}/property/${property.id}`, 'PUT', property);
};
export const deleteProperty = async (id) => {
  return await makeRequest(`${apiUrl}/property/${id}`, 'DELETE');
};

// CRUD para Landlord
export const createLandlord = async (landlord) => {
  return await makeRequest(`${apiUrl}/landlord/new`, 'POST', landlord);
};
export const updateLandlord = async (landlord) => {
  return await makeRequest(`${apiUrl}/landlord/${landlord.id}`, 'PUT', landlord);
};
export const deleteLandlord = async (id) => {
  return await makeRequest(`${apiUrl}/landlord/${id}`, 'DELETE');
};

// CRUD para Tenant
export const createTenant = async (tenant) => {
  return await makeRequest(`${apiUrl}/tenant/new`, 'POST', tenant);
};
export const updateTenant = async (tenant) => {
  return await makeRequest(`${apiUrl}/tenant/${tenant.id}`, 'PUT', tenant);
};
export const deleteTenant = async (id) => {
  return await makeRequest(`${apiUrl}/tenant/${id}`, 'DELETE');
};

// CRUD para Contract
export const createContract = async (contract) => {
  return await makeRequest(`${apiUrl}/contract/new`, 'POST', contract);
};
export const updateContract = async (contract) => {
  return await makeRequest(`${apiUrl}/contract/${contract.id}`, 'PUT', contract);
};
export const deleteContract = async (id) => {
  return await makeRequest(`${apiUrl}/contract/${id}`, 'DELETE');
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
// src/services/OwnerService.js

// Obtener todas las propiedades
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

// Obtener todos los landlords
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

// Obtener todos los tenants
export const fetchAllTenants = async () => {
  try {
    const response = await fetch(`${apiUrl}/tenant/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching tenants: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenants:', error);
    throw error;
  }
};

// Obtener todos los contratos
export const fetchAllContracts = async () => {
  try {
    const response = await fetch(`${apiUrl}/contract/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching contracts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};
