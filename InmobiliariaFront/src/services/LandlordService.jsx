
export const fetchOwnerProperties = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/properties`, {
    method: 'GET',
  });
  return await response.json();
};

export const fetchOwnerTenants = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/tenants`, {
    method: 'GET',
  });
  return await response.json();
};

export const fetchOwnerContracts = async (ownerId) => {
  const response = await fetch(`/api/landlords/${ownerId}/contracts`, {
    method: 'GET',
  });
  return await response.json();
};
