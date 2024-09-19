

  const updateOwner = (id, data) => update('owners', id, data);
  const deleteOwner = (id) => remove('owners', id);// src/services/OwnerService.js
  
  const API_URL = 'http://localhost:8080'; // Cambia esto según la URL de tu backend
  
  export const getAllOwners = async () => {
    try {
      const response = await fetch(`${API_URL}/owners/all`);
      if (!response.ok) {
        throw new Error('Error fetching owners');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const getOwnerById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/owners/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching owner with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export const createOwner = async (ownerData) => {
    try {
      const response = await fetch(`${API_URL}/owners/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ownerData),
      });
  
      if (!response.ok) {
        throw new Error('Error creating owner');
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
<<<<<<< HEAD
  };
=======

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating owner:", error);
    throw error;
  }
};

>>>>>>> F-Landlord
  
  // Puedes agregar más funciones para crear, actualizar y eliminar Owners
  
