import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import OwnersForm from '../../forms/OwnersForm/OwnersForm';
import EditModal from '../../shared-components/editModal/EditModal';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 
import {
  fetchAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../services/OwnerService';

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [editingOwner, setEditingOwner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const data = await fetchAllOwners();
      setOwners(data);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  const handleCreate = async (newOwner) => {
    try {
      const ownerData = { ...newOwner, adminId: 1 };
      const createdOwner = await createOwner(ownerData);
      setOwners((prevOwners) => [...prevOwners, createdOwner]);
      setShowAddModal(false);
      showSuccessToast("Owner agregado con éxito!");
    } catch (error) {
      console.error("Error creating owner", error);
    }
  };

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (editedOwner) => {
    try {
      const ownerData = { ...editedOwner, adminId: 1 };
      await updateOwner(ownerData); 
      loadOwners();
      setShowEditModal(false);
      setEditingOwner(null);
      showSuccessToast("Owner actualizado con éxito!");
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
      showSuccessToast("Owner eliminado con éxito!"); 
    } catch (error) {
      console.error("Error deleting owner", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOwner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <Card 
      title="Usuarios inmobiliaria" 
      allowAdd={true} 
      FormComponent={() => <OwnersForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />} 
    >
      <Table 
        columns={columns} 
        data={owners} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <OwnersForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          rowToEdit={editingOwner}
          setRowToEdit={setEditingOwner}
          handleSave={handleSaveEdit} 
          cancelEdit={() => setShowEditModal(false)}
        />
      )}
      <ToastContainerComponent /> 
    </Card>
  );
};

export default Owner;