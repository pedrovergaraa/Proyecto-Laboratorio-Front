const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Fetch all properties
export const fetchAllProperties = async () => {
  const response = await fetch(`${apiUrl}/property/all`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await response.json();
};

// Fetch all landlords
export const fetchAllLandlords = async () => {
  const response = await fetch(`${apiUrl}/landlord/all`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await response.json();
};

// Fetch all tenants
export const fetchAllTenants = async () => {
  const response = await fetch(`${apiUrl}/tenant/all`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await response.json();
};

// Fetch all contracts
export const fetchAllContracts = async () => {
  const response = await fetch(`${apiUrl}/contract/all`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await response.json();
};

export const getOwners = async () => {
    const response = await fetch(`${apiUrl}/owner/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  };
  