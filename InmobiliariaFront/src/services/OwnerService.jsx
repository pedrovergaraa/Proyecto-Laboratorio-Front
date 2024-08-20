  const getAllOwners = () => fetchAll('owners');
  const getOwnerById = (id) => fetchById('owners', id);
  const createOwner = (data) => create('owners', data);
  const updateOwner = (id, data) => update('owners', id, data);
  const deleteOwner = (id) => remove('owners', id);