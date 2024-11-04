import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const PropertiesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ adress: '', description: '', landlordMail: '',tenantMail: '', ownerMail:'owner@hotmail.com' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Llama a la función pasada como prop
    setFormData({ adress: '', description: '', landlordMail: '',tenantMail: '', ownerMail:'owner@hotmail.com' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aquí van tus campos de formulario */}
      <label>Direccion:</label>
      <input
        type="text"
        value={formData.adress}
        onChange={(e) => setFormData({ ...formData, adress: e.target.value })}
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
    </form>
  );
};

export default PropertiesForm;
