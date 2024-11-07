const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Token:", token);  
    if (!token) {
      throw new Error("No token found");
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };
  

export const fetchContractByLandLordMail = async (landlordMail) => {
    try {
      const requestBody = JSON.stringify({ landlordMail });
      console.log("Request Body:", requestBody);  
  
      const response = await fetch(`${apiUrl}/contract/by-landlord-mail`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: requestBody,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching contract by mail:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching contract by mail:", error);
      return null;
    }
  };
  

export const fetchPropertyByLandLordMail = async (landlordMail) => {
  try {
    const response = await fetch(`${apiUrl}/property/by-landlord-mail`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ landlordMail }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching property by mail:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching property by mail:", error);
    return null;
  }
};


export const fetchPaymentsByLandLordMail = async (landlordMail) => {
    try {
        const response = await fetch(`${apiUrl}/payments/by-tenant-mail`, {
            method: 'POST', 
            headers: {
              ...getAuthHeaders(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ landlordMail }), 
          });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching payments by mail:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching payments by mail:', error);
      return null;
    }
  };
