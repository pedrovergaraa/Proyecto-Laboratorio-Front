
export const fetchAllProperties = async () => {
    const response = await fetch('/api/properties', {
      method: 'GET',
    });
    return await response.json();
  };
  

  export const fetchAllLandlords = async () => {
    const response = await fetch('/api/landlords', {
      method: 'GET',
    });
    return await response.json();
  };
  
  export const fetchAllTenants = async () => {
    const response = await fetch('/api/tenants', {
      method: 'GET',
    });
    return await response.json();
  };
  
  export const fetchAllContracts = async () => {
    const response = await fetch('/api/contracts', {
      method: 'GET',
    });
    return await response.json();
  };
  
  export const createProperty = async (propertyData) => {
    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    return await response.json();
  };
  
  export const updateProperty = async (propertyId, propertyData) => {
    const response = await fetch(`/api/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    return await response.json();
  };
  
 
  export const deleteProperty = async (propertyId) => {
    const response = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
    });
    return await response.json();
  };
  