import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import EditModal from '../../shared-components/editModal/EditModal'; // Asegúrate de tener la ruta correcta
import {
  fetchAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../services/OwnerService';

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [editingOwner, setEditingOwner] = useState(null);  // Estado para manejar el propietario que se está editando
  const [showEditModal, setShowEditModal] = useState(false); // Para mostrar el modal de edición

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
    setEditingOwner(owner);  // Establecemos el propietario para editar
    setShowEditModal(true);  // Mostramos el modal
  };

  const handleSaveEdit = async (editedOwner) => {
    try {
      await updateOwner(editedOwner.id, editedOwner); // Asegúrate de que el id esté presente
      loadOwners();  // Recargamos los datos después de la edición
      setShowEditModal(false);  // Cerramos el modal
      setEditingOwner(null);  // Limpiamos el estado de edición
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

      {/* Aquí mostramos el modal de edición si hay un propietario para editar */}
      {showEditModal && (
        <EditModal
        handleInputChange={handleInputChange}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          rowToEdit={editingOwner}
          handleSave={handleSaveEdit}
          confirmEdit={handleSaveEdit}
          cancelEdit={() => setShowEditModal(false)} // Al cancelar, cerramos el modal
        />
      )}
    </Card>
  );
};

export default Owner;
