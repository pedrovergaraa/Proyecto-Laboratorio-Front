import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';
import EditModal from '../../shared-components/editModal/EditModal';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllLandlords, createLandlord, updateLandlord, deleteLandlord } from '../../services/LandlordService';

const Landlord = () => {
  const [landlords, setLandlords] = useState([]);
  const [editingLandlord, setEditingLandlord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  // Estado para mostrar el modal de agregar propietario

  useEffect(() => {
    loadLandlords();
  }, []);

  const loadLandlords = async () => {
    try {
      const data = await fetchAllLandlords();
      console.log("Datos recibidos desde la API:", data);  // Log para verificar la respuesta
      setLandlords(data);
    } catch (error) {
      toast.error("Error al cargar los propietarios");
    }
  };

  const handleCreate = async (landlordData) => {
    try {
      await createLandlord(landlordData);  // Asegúrate de que esta función esté funcionando correctamente
      showSuccessToast("Propietario agregado con éxito!");
      loadLandlords();  // Si necesitas recargar la lista de propietarios
    } catch (error) {
      toast.error("Error al agregar propietario");
    }
  };
  const handleEdit = (landlord) => {
    setEditingLandlord(landlord);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (editedLandlord) => {
    try {
      await updateLandlord(editedLandlord.id, editedLandlord);
      loadLandlords();  // Vuelve a cargar los datos de los propietarios
      setShowEditModal(false);  // Cierra el modal
      setEditingLandlord(null);  // Limpia el estado de la fila editada
      toast.success("Propietario actualizado con éxito");  // Notificación de éxito
    } catch (error) {
      toast.error("Error al actualizar el propietario");
    }
  };

  const handleDelete = async (id) => {
    console.log("Eliminando propietario con id:", id);  // Para verificar que se está recibiendo el id correctamente
    try {
      await deleteLandlord(id);
      setLandlords((prevLandlords) => prevLandlords.filter((landlord) => landlord.id !== id));
      toast.success("Propietario eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar el propietario");
    }
  };
  

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Email', accessor: 'mail' },
    { Header: 'Propiedades', accessor: 'propertyList' },
  ];

  const renderPropertiesDropdown = (properties) => {
    if (properties && properties.length > 0) {
      return (
        <details className="property-dropdown">
          <summary>Ver Propiedades</summary>
          {properties.map((property) => (
            <div key={property.id} className="property-item">
              <p><strong>Descripción:</strong> {property.description}</p>
              <p><strong>Dirección:</strong> {property.address || 'No hay una dirección cargada'}</p>
            </div>
          ))}
        </details>
      );
    }
    return <p>No hay propiedades disponibles</p>;
  };

  const data = landlords.map(landlord => ({
    id: landlord.id,
    mail: landlord.mail,
    propertyList: renderPropertiesDropdown(landlord.propertyList),
  }));

  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm} onAdd={handleCreate}>
        <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>

      {/* Modal para agregar un propietario */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <LandlordForm onAdd={handleCreate} closeModal={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          rowToEdit={editingLandlord}
          setRowToEdit={setEditingLandlord}
          handleSave={handleSaveEdit}  // Pasamos handleSaveEdit como handleSave
          cancelEdit={() => setShowEditModal(false)}
        />
      )}

      <ToastContainer /> {/* Contenedor de Toastify para las notificaciones */}
    </div>
  );
};

export default Landlord;
