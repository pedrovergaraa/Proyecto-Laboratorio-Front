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

export const fetchTenantProperty = async (tenantId) => {
  try {
    const response = await fetch(`${apiUrl}/tenants/${tenantId}/property`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching tenant properties');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant properties:', error);
    throw error;
  }
};

export const fetchTenantContract = async (tenantId) => {
  try {
    const response = await fetch(`${apiUrl}/tenants/${tenantId}/contract`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching tenant contracts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant contracts:', error);
    throw error;
  }
};


export const tenantPayRent = async (tenantId, paymentData) => {
  try {
    const response = await fetch(`${apiUrl}/tenants/${tenantId}/pay`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
      throw new Error('Error processing rent payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error processing rent payment:', error);
    throw error;
  }
};


export const fetchAllTenants = async () => {
  try {
    const response = await fetch(`${apiUrl}/tenant/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching tenants');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenants:', error);
    throw error;
  }
};

// Crear un nuevo inquilino
export const createTenant = async (tenant) => {
  try {
    const response = await fetch(`${apiUrl}/tenant/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tenant),
    });
    if (!response.ok) {
      throw new Error('Error creating tenant');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export const updateTenant = async (tenant) => {
  try {
    console.log('Tenant data:', tenant); 
    const response = await fetch(`${apiUrl}/tenant/${tenant.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tenant),
    });
    if (!response.ok) {
      throw new Error('Error updating tenant');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};


export const deleteTenant = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/tenant/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting tenant: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting tenant:', error);
    throw error;
  }
};
