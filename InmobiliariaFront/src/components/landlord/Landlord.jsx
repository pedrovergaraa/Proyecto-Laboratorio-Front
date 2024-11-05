import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';
import { fetchAllLandlords, updateLandlord, deleteLandlord } from '../../services/LandlordService';
import { ToastContainer, toast } from 'react-toastify';

const Landlord = () => {
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    loadLandlords();
  }, []);

  const loadLandlords = async () => {
    try {
      const data = await fetchAllLandlords();
      setLandlords(data);
    } catch (error) {
      toast.error("Error al cargar los propietarios");
    }
  };

  const columns = [
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

  const handleEdit = async (updatedLandlord) => {
    try {
      await updateLandlord(updatedLandlord);
      loadLandlords();
      toast.success("Propietario actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar el propietario");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLandlord(id);
      setLandlords(prev => prev.filter(landlord => landlord.id !== id));
      toast.success("Propietario eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar el propietario");
    }
  };

  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm} onAdd={() => loadLandlords()}>
        <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <ToastContainer /> {/* Contenedor de Toastify para las notificaciones */}
    </div>
  );
};

export default Landlord;
