import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import EditModal from '../../shared-components/editModal/EditModal';
import OwnersForm from '../../forms/OwnersForm/OwnersForm'; // Importar el formulario para agregar propietarios
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; // Asegúrate de importar la notificación
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
  const [showAddModal, setShowAddModal] = useState(false);  // Estado para mostrar el modal de agregar propietario

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
      setShowAddModal(false);  // Cierra el modal después de agregar el propietario
      showSuccessToast("Owner agregado con éxito!"); // Notificación de éxito
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
      showSuccessToast("Owner eliminado con éxito!"); // Notificación de éxito
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
      FormComponent={() => <OwnersForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />} // Le pasamos la función para cerrar el modal
    >
      <Table 
        columns={columns} 
        data={owners} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {/* Modal para agregar un propietario */}
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
          handleSave={handleSaveEdit} // Ahora pasamos handleSaveEdit como handleSave
          cancelEdit={() => setShowEditModal(false)}
        />
      )}
      <ToastContainerComponent /> {/* Aquí se coloca el contenedor de las notificaciones */}
    </Card>
  );
};

export default Owner;