
// Fetch the tenant's property
export const fetchTenantProperty = async (tenantId) => {
    const response = await fetch(`/api/tenants/${tenantId}/property`, {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Fetch the tenant's contract
  export const fetchTenantContract = async (tenantId) => {
    const response = await fetch(`/api/tenants/${tenantId}/contract`, {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Tenant payment for rent
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
  