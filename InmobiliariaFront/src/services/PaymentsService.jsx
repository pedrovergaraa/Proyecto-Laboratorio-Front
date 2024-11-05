const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (!tokenData || !tokenData.token) {
    throw new Error("No token found");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenData.token}`,
  };
};

// Obtener todos los pagos
export const fetchAllPayments = async () => {
  try {
    const response = await fetch(`${apiUrl}/payments/all`, {
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

// Crear un nuevo pago
export const createPayment = async (payment) => {
  try {
    const response = await fetch(`${apiUrl}/payments/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('Error creating payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Obtener un pago por ID
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

// Actualizar un pago existente
export const updatePayment = async (id, updatedPayment) => {
  try {
    const response = await fetch(`${apiUrl}/payment/${id}`, {
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

// Eliminar un pago
export const deletePayment = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/payment/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error deleting payment with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting payment with ID ${id}:`, error);
    throw error;
  }
};
