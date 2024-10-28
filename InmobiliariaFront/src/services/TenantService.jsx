import { API_URL } from "../constants/APIconstant";

export const fetchTenantProperty = async (tenantId) => {
    const response = await fetch(`/api/tenants/${tenantId}/property`, {
      method: 'GET',
    });
    return await response.json();
  };
  

  export const fetchTenantContract = async (tenantId) => {
    const response = await fetch(`/api/tenants/${tenantId}/contract`, {
      method: 'GET',
    });
    return await response.json();
  };

  export const tenantPayRent = async (tenantId, paymentData) => {
    const response = await fetch(`/api/tenants/${tenantId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return await response.json();
  };
  
// Obtener todos los tenants
export const fetchAllTenants = async () => {
    try {
      const response = await fetch(`${API_URL}/tenants`);
      if (!response.ok) {
        throw new Error('Error fetching tenants');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tenants:', error);
      throw error;
    }
  };
  
  // Crear un nuevo tenant
  export const createTenant = async (tenant) => {
    try {
      const response = await fetch(`${API_URL}/tenants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      
