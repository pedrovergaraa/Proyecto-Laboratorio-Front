const getAllProperties = () => fetchAll('properties');
const getPropertyById = (id) => fetchById('properties', id);
const createProperty = (data) => create('properties', data);
const updateProperty = (id, data) => update('properties', id, data);
const deleteProperty = (id) => remove('properties', id);