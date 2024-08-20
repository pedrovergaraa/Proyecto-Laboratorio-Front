const apiUrl = 'https://your-backend.com/api'; // Cambia esto a la URL de tu backend

// Function to fetch all records from an endpoint
const fetchAll = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to fetch a record by ID
const fetchById = async (endpoint, id) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to create a new record
const create = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error creating data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to update a record by ID
const update = async (endpoint, id, data) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error updating data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to delete a record by ID
const remove = async (endpoint, id) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting data');
    }
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};
