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


export const fetchContractByMail = async (tenantMail) => {
    try {
      const response = await fetch(`${apiUrl}/contract/by-tenant-mail`, {
        method: 'POST', 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenantMail }), 
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
  
  


export const fetchPropertyByMail = async (tenantMail) => {
    try {
      const response = await fetch(`${apiUrl}/property/by-tenant-mail`, {
        method: 'POST', 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenantMail }),  
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
  



export const createPayment = async (paymentData) => {
    try {
      const response = await fetch(`${apiUrl}/payments/new`, {
        method: "POST",
        headers: getAuthHeaders(), 
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        const newPayment = await response.json();
        return newPayment;
      } else {
        console.error("Error creating payment:", response.statusText, response.status);
        return null;
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      return null;
    }
  };


  export const fetchPaymentsByMail = async (tenantMail) => {
    try {
        const response = await fetch(`${apiUrl}/payments/by-tenant-mail`, {
            method: 'POST', 
            headers: {
              ...getAuthHeaders(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tenantMail }), 
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

