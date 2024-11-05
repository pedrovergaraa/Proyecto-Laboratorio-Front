import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';
import { createProperty } from '../../services/PropertyService'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const PropertiesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    landlordMail: '',
    tenantMail: '',
    ownerMail: 'owner@hotmail.com',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddClick(formData); // Llama a la función para agregar la propiedad
    setFormData({
      address: '',
      description: '',
      landlordMail: '',
      tenantMail: '',
      ownerMail: 'owner@hotmail.com',
    });
  };

  const handleAddClick = async (property) => {
    try {
      const newProperty = await createProperty(property); // Llama al servicio para crear la propiedad
      showSuccessToast('Propiedad añadida exitosamente'); // Muestra la notificación de éxito
      onAdd(newProperty); // Llama a la función onAdd pasada como prop para actualizar la lista de propiedades
    } catch (error) {
      console.error('Error al añadir la propiedad:', error);
      // Aquí podrías manejar la notificación de error si es necesario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aquí van tus campos de formulario */}
      <label>Dirección:</label>
      <input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <label>Descripción:</label>
      <input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <label>Email Propietario:</label>
      <input
        type="email"
        value={formData.landlordMail}
        onChange={(e) => setFormData({ ...formData, landlordMail: e.target.value })}
      />
      <label>Email Inquilino:</label>
      <input
        type="email"
        value={formData.tenantMail}
        onChange={(e) => setFormData({ ...formData, tenantMail: e.target.value })}
      />
      <button type="submit">Añadir Propiedad</button>
      <ToastContainerComponent /> {/* Asegúrate de incluir el componente Toast */}
    </form>
  );
};

export default PropertiesForm;
