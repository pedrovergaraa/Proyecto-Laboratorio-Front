// Obtener todos los contratos
export const fetchAllContracts = async () => {
    try {
      const response = await fetch(`${API_URL}/contracts`);
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
      const response = await fetch(`${API_URL}/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
  