// const apiUrl = import.meta.env.VITE_API_URL;

// // Fetch all properties
// export const fetchAllProperties = async () => {
//   const response = await fetch(`${apiUrl}/property/all`, {
//     method: 'GET',
//   });
//   return await response.json();
// };

// // Fetch all landlords
// export const fetchAllLandlords = async () => {
//   const response = await fetch(`${apiUrl}/landlord/all`, {
//     method: 'GET',
//   });
//   return await response.json();
// };

// // Fetch all tenants
// export const fetchAllTenants = async () => {
//   const response = await fetch(`${apiUrl}/tenant/all`, {
//     method: 'GET',
//   });
//   return await response.json();
// };

// // Fetch all contracts
// export const fetchAllContracts = async () => {
//   const response = await fetch(`${apiUrl}/contract/all`, {
//     method: 'GET',
//   });
//   return await response.json();
// };

// // Create a new property
// export const createProperty = async (propertyData) => {
//   const response = await fetch(`${apiUrl}/property/new`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(propertyData),
//   });
//   return await response.json();
// };

// // Update a property
// export const updateProperty = async (propertyId, propertyData) => {
//   const response = await fetch(`${apiUrl}/property/${propertyId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(propertyData),
//   });
//   return await response.json();
// };

// // Delete a property
// export const deleteProperty = async (propertyId) => {
//   const response = await fetch(`${apiUrl}/property/${propertyId}`, {
//     method: 'DELETE',
//   });
//   return await response.json();
// };
