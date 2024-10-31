import React, { useState, useEffect } from 'react';
import ContractsForm from '../../forms/ContractsForm/ContractsForm';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import {
  fetchAllContracts,
  createContract,
  updateContract,
  deleteContract,
} from '../../services/ContractService';

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentContract, setCurrentContract] = useState(null); // Para editar un contrato

  useEffect(() => {
    const fetchContracts = async () => {
      const data = await fetchAllContracts();
      setContracts(data);
    };

    fetchContracts();
  }, []);

  const handleAddContract = async (contractData) => {
    const newContract = await createContract(contractData);
    setContracts([...contracts, newContract]);
    setShowAddModal(false);
  };

  const handleEditContract = async (updatedContract) => {
    await updateContract(updatedContract.id, updatedContract);
    setContracts(contracts.map((contract) => (contract.id === updatedContract.id ? updatedContract : contract)));
    setCurrentContract(null);
  };

  const handleDeleteContract = async (contractId) => {
    await deleteContract(contractId);
    setContracts(contracts.filter((contract) => contract.id !== contractId));
  };

  const columns = [
    { Header: 'Contract ID', accessor: 'contractId' },
    { Header: 'Property ID', accessor: 'propertyId' },
    { Header: 'Tenant', accessor: 'tenantName' },
    { Header: 'Rent Amount', accessor: 'rentAmount' },
    { Header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <Card title='Contratos' FormComponent={ContractsForm}>
        <Table 
          columns={columns} 
          data={contracts} 
          onEdit={handleEditContract} 
          onDelete={handleDeleteContract} 
          onAdd={() => setShowAddModal(true)} // Pasar la función aquí
        />
      </Card>

      {/* Modal para agregar nuevo contrato */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nuevo Contrato</h2>
            <ContractsForm onSubmit={handleAddContract} />
            <button onClick={() => setShowAddModal(false)} className="cancel-button">Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para editar contrato */}
      {currentContract && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Contrato</h2>
            <ContractsForm contract={currentContract} onSubmit={handleEditContract} />
            <button onClick={() => setCurrentContract(null)} className="cancel-button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
