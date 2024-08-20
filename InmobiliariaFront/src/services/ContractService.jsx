const getAllContracts = () => fetchAll('contracts');
  const getContractById = (id) => fetchById('contracts', id);
  const createContract = (data) => create('contracts', data);
  const updateContract = (id, data) => update('contracts', id, data);
  const deleteContract = (id) => remove('contracts', id); 