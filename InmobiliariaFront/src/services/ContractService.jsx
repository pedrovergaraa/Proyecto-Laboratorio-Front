const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllContracts = async () => {
    try {
      const response = await fetch(`${apiUrl}/contract/all`);
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
  