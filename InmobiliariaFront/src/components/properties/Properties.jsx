import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import React, { useState, useEffect } from 'react';
import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';
import { fetchAllProperties, createProperty, updateProperty, deleteProperty } from '../../services/PropertyService';
import { ToastContainer, toast } from 'react-toastify';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (error) {
        setError("Error fetching properties");
        toast.error("Error al cargar las propiedades");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const addProperty = async (property) => {
    try {
      const newProperty = await createProperty(property);
      setProperties((prev) => [...prev, newProperty]); 
      toast.success("Propiedad añadida con éxito");
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Error al añadir la propiedad");
    }
  };

  const editProperty = async (updatedProperty) => {
    try {
      await updateProperty(updatedProperty);
      setProperties((prev) =>
        prev.map((property) =>
          property.id === updatedProperty.id ? updatedProperty : property
        )
      );
      toast.success("Propiedad actualizada con éxito");
    } catch (error) {
      console.error("Error editing property:", error);
      toast.error("Error al actualizar la propiedad");
    }
  };

  const removeProperty = async (id) => {
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((property) => property.id !== id));
      toast.success("Propiedad eliminada con éxito");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error al eliminar la propiedad");
    }
  };

  const columns = [
    { Header: 'Dirección', accessor: 'address' }, 
    { Header: 'Descripción', accessor: 'description' },
    { Header: 'Email Propietario', accessor: 'landlordMail' },
    { Header: 'Email Inquilino', accessor: 'tenantMail' },
    { Header: 'Email Inmobiliaria', accessor: 'ownerMail' },
  ];

  return (
    <div>
      <Card title="Propiedades" FormComponent={() => 
        <PropertiesForm 
          onAdd={addProperty} 
        />
      }>
        {loading ? (
          <p>Cargando propiedades...</p>
        ) : error ? (
          <p>{error}</p>
        ) : properties.length > 0 ? (
          <Table
            columns={columns}
            data={properties}
            onEdit={editProperty}
            onDelete={removeProperty}
          />
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Properties;
