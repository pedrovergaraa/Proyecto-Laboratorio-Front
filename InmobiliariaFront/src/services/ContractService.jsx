const apiUrl = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    throw new Error("No token found");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};


export const fetchAllContracts = async () => {
  try {
    const response = await fetch(`${apiUrl}/contract/all`, {
      headers: getAuthHeaders(), 
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

export const createContract = async (contract) => {
  try {
    const response = await fetch(`${apiUrl}/contract/new`, {
      method: 'POST',
      headers: getAuthHeaders(), 
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

export const fetchContractById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      headers: getAuthHeaders(), 
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

export const updateContract = async (id, updatedContract) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(), 
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
export const deleteContract = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/contract/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error deleting contract with ID ${id}`);
    }

    // Verifica si la respuesta tiene contenido
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();  // Si es JSON, lo parseamos
    } else {
      const text = await response.text();  // Si no es JSON, leemos el texto
      console.error("Unexpected response:", text);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error(`Error deleting contract with ID ${id}:`, error);
    throw error;
  }
};
