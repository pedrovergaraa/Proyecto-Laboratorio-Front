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

export const fetchAllPayments = async () => {
  try {
    const response = await fetch(`${apiUrl}/payments/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching payments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};


export const createPayment = async (payment) => {
  try {
    const response = await fetch(`${apiUrl}/payments/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payment),
    });
    console.log("payment",payment)
    if (!response.ok) {
      throw new Error('Error creating payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};


export const fetchPaymentById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/payment/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching payment with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching payment with ID ${id}:`, error);
    throw error;
  }
};


export const updatePayment = async (id, updatedPayment) => {
  try {
    const response = await fetch(`${apiUrl}/payments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedPayment),
    });
    if (!response.ok) {
      throw new Error(`Error updating payment with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating payment with ID ${id}:`, error);
    throw error;
  }
};

export const deletePayment = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/payments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
    } catch (error) {
      console.error(`Error deleting payment with ID ${id}:`, error);
      throw error;
    }
  };
  
