const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Obtener todos los contratos
export const fetchAllContracts = async () => {
  try {
    const response = await fetch(`${apiUrl}/contract/all`, {
      headers: getAuthHeaders(), // Agrega los encabezados aquí
    });
    if (!response.ok) {
      throw new Error('Error fetching contracts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};

// Crear un nuevo contrato
export const createContract = async (contract) => {
  try {
    const response = await fetch(`${apiUrl}/contract/new`, {
      method: 'POST',
      headers: getAuthHeaders(), // Agrega los encabezados aquí
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error('Error creating contract');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating contract:', error);
    throw error;
  }
};

// Obtener un contrato por ID
export const fetchContractById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      headers: getAuthHeaders(), // Agrega los encabezados aquí
    });
    if (!response.ok) {
      throw new Error(`Error fetching contract with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching contract with ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un contrato existente
export const updateContract = async (id, updatedContract) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(), // Agrega los encabezados aquí
      body: JSON.stringify(updatedContract),
    });
    if (!response.ok) {
      throw new Error(`Error updating contract with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating contract with ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un contrato
export const deleteContract = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(), // Agrega los encabezados aquí
    });
    if (!response.ok) {
      throw new Error(`Error deleting contract with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting contract with ID ${id}:`, error);
    throw error;
  }
};
