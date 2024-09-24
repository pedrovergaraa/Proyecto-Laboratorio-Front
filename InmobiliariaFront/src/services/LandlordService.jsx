// Fetch properties owned by the landlord
export const fetchOwnerProperties = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/properties`, {
    method: 'GET',
  });
  return await response.json();
};

// Fetch tenants of a landlord
export const fetchOwnerTenants = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/tenants`, {
    method: 'GET',
  });
  return await response.json();
};

// Fetch contracts related to the landlord's properties
export const fetchOwnerContracts = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/contracts`, {
    method: 'GET',
  });
  return await response.json();
};
