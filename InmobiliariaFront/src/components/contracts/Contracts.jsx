import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [selectedContract, setSelectedContract] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContracts();
        setContracts(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los contratos");
      }
    };
    fetchContracts();
  }, []);

  const handleAddContract = async (contractData) => {
    try {
      const newContract = await createContract(contractData);
      setContracts([...contracts, newContract]);
      toast.success("Contrato añadido con éxito");
    } catch (error) {
      console.error(error);
      toast.error("Error al añadir el contrato");
    }
  };

  const handleEditContract = async (updatedContract) => {
    try {
      const contract = await updateContract(updatedContract.id, updatedContract);
      setContracts(
        contracts.map((c) => (c.id === updatedContract.id ? contract : c))
      );
      toast.success("Contrato actualizado con éxito");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el contrato");
    }
  };

  const handleDeleteContract = async (contractId) => {
    try {
      await deleteContract(contractId);
      setContracts(contracts.filter((contract) => contract.id !== contractId));
      toast.success("Contrato eliminado con éxito");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el contrato");
    }
  };

  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
  };

  const columns = [
    { Header: 'Email del Propietario', accessor: 'landlordMail' },
    { Header: 'Email del Inquilino', accessor: 'tenantMail' },
    { 
      Header: 'Fecha de Inicio', 
      accessor: 'date', 
      Cell: ({ value }) => new Date(value).toLocaleDateString()
    },
    { 
      Header: 'Fecha de Fin', 
      accessor: 'endDate', 
      Cell: ({ value }) => new Date(value).toLocaleDateString()
    },
  ];

  return (
    <div>
      <Card title="Contratos" FormComponent={() => (
        <ContractsForm 
          onSubmit={selectedContract ? handleEditContract : handleAddContract} 
          contract={selectedContract} 
          fields={['date', 'endDate', 'landlordMail', 'tenantMail']} 
        />
      )}>
        <Table 
          columns={columns} 
          data={contracts} 
          onEdit={handleSelectContract} 
          onDelete={handleDeleteContract} 
        />
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Contracts;
