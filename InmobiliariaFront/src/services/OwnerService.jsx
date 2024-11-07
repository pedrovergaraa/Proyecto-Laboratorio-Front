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
    

    // const landlordMails = owners.flatMap(owner => 
    //   owner.landlordList.map(landlord => landlord.mail)
    // );
    // const tenantMails = owners.flatMap(owner => 
    //   owner.tenantList.map(tenant => tenant.mail)
    // );
    
    // return { landlordMails, tenantMails }; 
    return owners
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};


export const createOwner = async (ownerData, landlordList, tenantList) => {
  try {
    const landlordEmails = landlordList.map(landlord => landlord.mail);
    const tenantEmails = tenantList.map(tenant => tenant.mail);

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


export const updateOwner = async (id, ownerData, landlordList, tenantList) => {
  try {
    const landlordmails = landlordList.map(landlord => landlord.mail);
    const tenantmails = tenantList.map(tenant => tenant.mail);

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

export const deleteOwner = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/owner/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error deleting owner: ${response.status}`);
    }

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    }
    return null; 
  } catch (error) {
    console.error('Error deleting owner:', error);
    throw error;
  }
};

export const tenantList = [];
export const landlordList = [];