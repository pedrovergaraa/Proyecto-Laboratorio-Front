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
  };

  const handleEditContract = async (updatedContract) => {
    await updateContract(updatedContract.id, updatedContract);
    setContracts(
      contracts.map((contract) =>
        contract.id === updatedContract.id ? updatedContract : contract
      )
    );
  };

  const handleDeleteContract = async (contractId) => {
    await deleteContract(contractId);
    setContracts(contracts.filter((contract) => contract.id !== contractId));
  };

  const columns = [
    { Header: 'Email del Propietario', accessor: 'landlordMail' },
    { Header: 'Email del Inquilino', accessor: 'tenantMail' },
    { Header: 'Monto del Alquiler', accessor: 'rentAmount' },
    { 
      Header: 'Fecha de Inicio', 
      accessor: 'date', 
      Cell: ({ value }) => new Date(value).toLocaleDateString() // Formatear solo la fecha
    },
    { 
      Header: 'Fecha de Fin', 
      accessor: 'endDate', 
      Cell: ({ value }) => new Date(value).toLocaleDateString() // Formatear solo la fecha
    },
  ];
  

  return (
    <div>
      <Card
        title="Contratos"
        FormComponent={ContractsForm}
        formProps={{
          onSubmit: handleAddContract,
          fields: ['date', 'endDate', 'landlordMail', 'tenantMail', 'rentAmount'],
        }}
      >
        <Table
          columns={columns}
          data={contracts}
          onEdit={handleEditContract}
          onDelete={handleDeleteContract}
          disableAddButton={true} // Deshabilitamos el botón de agregar en la tabla
        />
      </Card>
    </div>
  );
};

export default Contracts;
