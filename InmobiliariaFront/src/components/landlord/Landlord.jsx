import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllLandlords, createLandlord, updateLandlord, deleteLandlord } from '../../services/LandlordService';

const Landlord = () => {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLandlords();
  }, []);

  const loadLandlords = async () => {
    try {
      const data = await fetchAllLandlords();
      setLandlords(data);
      setError(null); 
    } catch (error) {
      setError("Error fetching landlords");
      toast.error("Error al cargar los propietarios");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (landlordData) => {
    try {
      const newLandlord = await createLandlord(landlordData);
      setLandlords((prev) => [...prev, newLandlord]);
      toast.success("Propietario agregado con éxito");
    } catch (error) {
      console.error("Error adding landlord:", error);
      toast.error("Error al agregar propietario");
    }
  };

  const handleEdit = async (updatedLandlord) => {
    const cleanLandlord = {
      id: updatedLandlord.id,
      mail: updatedLandlord.mail,
      name: updatedLandlord.name,
      password: '',
      ownerId: 4
    };
  
    console.log("Updated landlord data:", cleanLandlord); 
  
    try {
      await updateLandlord(cleanLandlord);
      setLandlords((prev) =>
        prev.map((landlord) =>
          landlord.id === updatedLandlord.id ? updatedLandlord : landlord
        )
      );
      toast.success("Propietario actualizado con éxito");
    } catch (error) {
      console.error("Error editing landlord:", error);
      toast.error("Error al actualizar el propietario");
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await deleteLandlord(id);
      setLandlords((prev) => prev.filter((landlord) => landlord.id !== id));
      toast.success("Propietario eliminado con éxito");
    } catch (error) {
      console.error("Error deleting landlord:", error);
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

  const dataLandlords = landlords.map(landlord => ({
    name: landlord.name,
    id: landlord.id,
    mail: landlord.mail,
    propertyList: renderPropertiesDropdown(landlord.propertyList),
  }));

  return (
    <div>
      <Card title="Propietarios" FormComponent={() => 
        <LandlordForm onAdd={handleCreate} />
      }>
        {loading ? (
          <p>Cargando propietarios...</p>
        ) : error ? (
          <p>{error}</p>
        ) : landlords.length > 0 ? (
          <Table
            columns={columns}
            data={dataLandlords}  
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </Card>
      <ToastContainer /> 
    </div>
  );
};

export default Landlord;
