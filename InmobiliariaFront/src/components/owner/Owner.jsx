import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import EditModal from '../../shared-components/editModal/EditModal';
import OwnersForm from '../../forms/OwnersForm/OwnersForm'; // Importar el formulario para agregar propietarios
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
      const createdOwner = await createOwner(newOwner);
      setOwners((prevOwners) => [...prevOwners, createdOwner]);
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
      await updateOwner(editedOwner.id, editedOwner);
      loadOwners();  // Vuelve a cargar los datos de los propietarios
      setShowEditModal(false);  // Cierra el modal
      setEditingOwner(null);  // Limpia el estado de la fila editada
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
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
      FormComponent={() => <OwnersForm onAdd={handleCreate} />}
    >
      <Table 
        columns={columns} 
        data={owners} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      {showEditModal && (
  <EditModal
    // handleInputChange={handleInputChange}
    showEditModal={showEditModal}
    setShowEditModal={setShowEditModal}
    rowToEdit={editingOwner}
    setRowToEdit={setEditingOwner}
    handleSave={handleSaveEdit} // Ahora pasamos handleSaveEdit como handleSave
    cancelEdit={() => setShowEditModal(false)}
  />
)}

    </Card>
  );
};

export default Owner;
