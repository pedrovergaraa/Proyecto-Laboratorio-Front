const API_URL = "http://localhost:8080/Owner"; // Reemplaza con la URL de tu backend

// Función para obtener todos los Owners
export const getAllOwners = async (token) => {
  try {
    const response = await fetch(`${API_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Incluye el token aquí
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los Owners");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
};

// Función para crear un nuevo Owner
export const createOwner = async (owner, token) => {
  try {
    const response = await fetch(`${API_URL}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Incluye el token aquí
      },
      body: JSON.stringify(owner),
    });

    if (!response.ok) {
      throw new Error("Error al crear el Owner");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating owner:", error);
    throw error;
  }
};
