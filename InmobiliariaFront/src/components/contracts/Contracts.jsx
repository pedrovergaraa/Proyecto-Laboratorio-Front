// src/components/Contracts/Contracts.jsx

import React, { useState, useEffect } from 'react';
import ContractsForm from '../../forms/ContractsForm/ContractsForm';
import Card from '../../shared-components/card/Card';
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
    { Header: 'Tenant', accessor: 'tenantEmail' },
    { Header: 'Monto', accessor: 'rentAmount' },
    { Header: 'Estado', accessor: 'status' },
  ];

  return (
    <div>
      <Card title="Contratos" FormComponent={ContractsForm}>
        <Table
          columns={columns}
          data={contracts}
          onEdit={handleEditContract}
          onDelete={handleDeleteContract}
          disableAddButton={true} // Deshabilitamos el botón de agregar en la tabla
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="custom-add-button"
        >
          + Agregar Contrato
        </button>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="custom-payment-button"
        >
          Realizar Pago
        </button>
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
              fields={['startDate', 'endDate', 'ownerEmail', 'tenantEmail']}
            />
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="modal-close-button"
            >
              &times;
            </button>
            <h2>Realizar Pago</h2>
            <ContractsForm
              onSubmit={(paymentData) => {
                console.log(paymentData);
                setShowPaymentModal(false);
              }}
              fields={['rentAmount']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
