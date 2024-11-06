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

// services/OwnerService.jsx

export const fetchAllOwners = async () => {
  try {
    const response = await fetch(`${apiUrl}/owner/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error fetching owners: ${response.status}`);
    }
    const owners = await response.json();
    
    // Extraemos los correos de landlordList y tenantList
    const landlordMails = owners.flatMap(owner => 
      owner.landlordList.map(landlord => landlord.mail)
    );
    const tenantMails = owners.flatMap(owner => 
      owner.tenantList.map(tenant => tenant.mail)
    );
    
    return { landlordMails, tenantMails }; // Retornamos los correos de los landlords e inquilinos
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};


// Crear un nuevo propietario, ahora recibiendo las listas de landlord y tenant
export const createOwner = async (ownerData, landlordList, tenantList) => {
  try {
    // Obtener los correos de los landlords y tenants desde las listas
    const landlordEmails = landlordList.map(landlord => landlord.mail);
    const tenantEmails = tenantList.map(tenant => tenant.mail);

    // Incluir los correos en el objeto de datos del propietario
    const updatedOwnerData = {
      ...ownerData,
      landlordEmails,
      tenantEmails,
    };

    const response = await fetch(`${apiUrl}/owner/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedOwnerData),
    });
    if (!response.ok) {
      throw new Error(`Error creating owner: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating owner:', error);
    throw error;
  }
};

// Actualizar un propietario, también recibiendo las listas de landlords y tenants
export const updateOwner = async (id, ownerData, landlordList, tenantList) => {
  try {
    // Obtener los correos de los landlords y tenants desde las listas
    const landlordmails = landlordList.map(landlord => landlord.mail);
    const tenantmails = tenantList.map(tenant => tenant.mail);

    // Incluir los correos en el objeto de datos del propietario
    const updatedOwnerData = {
      ...ownerData,
      landlordmails,
      tenantmails,
    };

    const response = await fetch(`${apiUrl}/owner/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedOwnerData),
    });
    if (!response.ok) {
      throw new Error(`Error updating owner: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating owner:', error);
    throw error;
  }
};

// Eliminar un propietario
export const deleteOwner = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/owner/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error deleting owner: ${response.status}`);
    }
    // Solo intenta parsear JSON si la respuesta tiene contenido JSON
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    }
    return null; // o cualquier valor adecuado si no hay respuesta JSON
  } catch (error) {
    console.error('Error deleting owner:', error);
    throw error;
  }
};

export const tenantList = [];
export const landlordList = [];