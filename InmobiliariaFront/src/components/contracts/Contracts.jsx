import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import EditModal from '../../shared-components/editModal/EditModal';
import ContractsForm from '../../forms/ContractsForm/ContractsForm'; 
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 
import {
  fetchAllContracts,
  createContract,
  updateContract,
  deleteContract,
} from '../../services/ContractService';

const Contract = () => {
  const [contracts, setContracts] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const data = await fetchAllContracts();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts", error);
    }
  };

  const handleCreate = async (newContract) => {
    try {
      const createdContract = await createContract(newContract);
      setContracts((prevContracts) => [...prevContracts, createdContract]);
      setShowAddModal(false);  
      showSuccessToast("Contrato agregado con éxito!"); 
    } catch (error) {
      console.error("Error creating contract", error);
    }
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (editedContract) => {
    try {
      await updateContract(editedContract.id, editedContract);
      loadContracts();  
      setShowEditModal(false);  
      setEditingContract(null);  
    } catch (error) {
      console.error("Error updating contract", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContract(id);
      setContracts((prevContracts) => prevContracts.filter((contract) => contract.id !== id));
      showSuccessToast("Contrato eliminado con éxito!");
    } catch (error) {
      console.error("Error deleting contract", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContract((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
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
    <Card 
      title="Contratos inmobiliarios" 
      allowAdd={true} 
      FormComponent={() => <ContractsForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />} 
    >
      <Table 
        columns={columns} 
        data={contracts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <ContractsForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          rowToEdit={editingContract}
          setRowToEdit={setEditingContract}
          handleSave={handleSaveEdit} 
          cancelEdit={() => setShowEditModal(false)}
        />
      )}
      <ToastContainerComponent /> 
    </Card>
  );
};

export default Contract;
