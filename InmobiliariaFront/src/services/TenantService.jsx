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
      