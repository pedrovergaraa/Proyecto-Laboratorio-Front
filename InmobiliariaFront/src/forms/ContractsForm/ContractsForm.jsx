import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const ContractsForm = ({ onAdd, closeModal }) => { 
  const [contractData, setContractData] = useState({
    tenantMail: '',
    date: '',
    endDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContractData({ ...contractData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onAdd) {
      onAdd(contractData); 
      showSuccessToast("Contrato agregado con éxito!");  
      setContractData({ tenantMail: '', date: '', endDate: '' });  
      closeModal(); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente:</label>
        <input
          type="email"
          name="tenantMail"
          value={contractData.tenantMail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          name="date"
          value={contractData.date}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Finalización:</label>
        <input
          type="date"
          name="endDate"
          value={contractData.endDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default ContractsForm;
