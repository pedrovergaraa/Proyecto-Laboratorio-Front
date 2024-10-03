// Fetch all properties
export const fetchAllProperties = async () => {
    const response = await fetch('/api/properties', {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Fetch all landlords
  export const fetchAllLandlords = async () => {
    const response = await fetch('/api/landlords', {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Fetch all tenants
  export const fetchAllTenants = async () => {
    const response = await fetch('/api/tenants', {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Fetch all contracts
  export const fetchAllContracts = async () => {
    const response = await fetch('/api/contracts', {
      method: 'GET',
    });
    return await response.json();
  };
  
  // Create a new property
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
  
  // Update a property
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
  
  // Delete a property
  export const deleteProperty = async (propertyId) => {
    const response = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
    });
    return await response.json();
  };
  