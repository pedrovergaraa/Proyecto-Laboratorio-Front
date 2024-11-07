import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const ContractsForm = ({ onAdd, closeModal }) => {
  const [contractData, setContractData] = useState({
    tenantMail: '',
    endDate: ''
  });

  // Maneja el cambio de valores en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const formattedEndDate = new Date(contractData.endDate).toISOString(); 
    
    const updatedContractData = {
      ...contractData,
      endDate: formattedEndDate 
    };
  
    if (onAdd) {
      onAdd(updatedContractData); 
      showSuccessToast("Contrato agregado con éxito!");
      setContractData({ tenantMail: '', endDate: '' });
      closeModal();
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tenantMail">Email Inquilino:</label>
        <input
          type="email"
          id="tenantMail"
          name="tenantMail"
          value={contractData.tenantMail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">Fecha de Finalización:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={contractData.endDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
      <ToastContainerComponent /> {/* Asegúrate de que este componente esté funcionando */}
    </form>
  );
};

export default ContractsForm;
