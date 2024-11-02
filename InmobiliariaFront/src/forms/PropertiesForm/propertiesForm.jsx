import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const PropertiesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ adress: '', description: '', landlordId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Llama a la función pasada como prop
    setFormData({ adress: '', description: '', landlordId: '' }); // Reinicia el formulario
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
      <label>ID Inquilino:</label>
      <input
        type="number"
        value={formData.landlordId}
        onChange={(e) => setFormData({ ...formData, landlordId: e.target.value })}
      />
      <button type="submit">Añadir Propiedad</button>
    </form>
  );
};

export default PropertiesForm;
