const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllProperties = async () => {
    const token =   JSON.parse(localStorage.getItem("token")) 
    // try {
      const response = await fetch(`${apiUrl}/property/all`,{
      method: 'GET',
      
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
       console.log(response);
      }
      return await response.json();
    // } catch (error) {
    //   console.error('Error fetching properties:', error);
    //   throw error;
    // }
  };
    
  export const createProperty = async (property) => {
    try {
      const response = await fetch(`${apiUrl}/property`, {
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
  