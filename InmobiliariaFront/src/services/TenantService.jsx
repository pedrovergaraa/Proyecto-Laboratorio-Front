const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${apiUrl}/tenant/all`);
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
      const response = await fetch(`${apiUrl}/tenant/new`, {
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
      

  // Actualizar un tenant
  export const updateTenant = async (tenant) => {
    try {
      const response = await fetch(`${apiUrl}/tenant/${tenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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
  
  // Eliminar un tenant
  export const deleteTenant = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/tenant/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting tenant');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting tenant:', error);
      throw error;
    }
  };
  