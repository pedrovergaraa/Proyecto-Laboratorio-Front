import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const TenantForm = ({ tenantData, onAdd, onEdit, onDelete }) => {
  const [formData, setFormData] = useState(tenantData || { name: '', mail: '', password: '', ownerId: '4' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tenantData) { 
      onEdit(formData); 
      showSuccessToast("Inquilino editado con éxito!");
    } else {
      onAdd(formData); 
      showSuccessToast("Inquilino agregado con éxito!");
    }
    setFormData({ name: '', mail: '', password: '', ownerId: '4' }); 
  };

  const handleDelete = () => {
    if (tenantData && onDelete) {
      onDelete(tenantData.id); 
      showSuccessToast("Inquilino eliminado con éxito!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">{tenantData ? 'Editar Inquilino' : 'Agregar Inquilino'}</button>
      {tenantData && (
        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Eliminar Inquilino
        </button>
      )}
      <ToastContainerComponent /> 
    </form>
  );
};

export default TenantForm;
