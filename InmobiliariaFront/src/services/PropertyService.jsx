import { API_URL } from '../constants/APIconstant';

export const fetchAllProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/properties`);
      if (!response.ok) {
        throw new Error('Error fetching properties');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  };
    
  export const createProperty = async (property) => {
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      if (!response.ok) {
        throw new Error('Error creating property');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  };
  