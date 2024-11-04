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
  const [currentContract, setCurrentContract] = useState(null);

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
    setContracts(
      contracts.map((contract) =>
        contract.id === updatedContract.id ? updatedContract : contract
      )
    );
    setCurrentContract(null);
  };

  const handleDeleteContract = async (contractId) => {
    await deleteContract(contractId);
    setContracts(contracts.filter((contract) => contract.id !== contractId));
  };

  const columns = [
    { Header: 'Email del Propietario', accessor: 'landlordMail' },
    { Header: 'Email del Inquilino', accessor: 'tenantMail' },
    { Header: 'Fecha de Inicio', accessor: 'date' },
    { Header: 'Fecha de Fin', accessor: 'endDate' },
  ];

  return (
    <div>
      <Card title="Contratos" FormComponent={() => (
        <ContractsForm
          contract={currentContract}
          onSubmit={currentContract ? handleEditContract : handleAddContract}
          fields={['date', 'endDate', 'landlordMail', 'tenantMail']}
        />
      )}>
        <Table
          columns={columns}
          data={contracts}
          onEdit={setCurrentContract} // Para editar, pasamos el contrato seleccionado
          onDelete={handleDeleteContract}
          disableAddButton={true} // Deshabilitamos el botón de agregar en la tabla
        />
      </Card>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowAddModal(false)}
              className="modal-close-button"
            >
              &times;
            </button>
            <h2>Agregar Nuevo Contrato</h2>
            <ContractsForm
              onSubmit={handleAddContract}
              fields={['date', 'endDate', 'landlordMail', 'tenantMail']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
