import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const PropertiesForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    tenantId: '',
    landlordId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = async (event) => {
    event.preventDefault();

    if (onAdd) {
      await onAdd(formData);
      showSuccessToast("Propiedad agregada con éxito!");
    }

    if (onClose) onClose();
  };

  return (
    <form>
      <div>
        <label>Direccion</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>Descripción</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>ID Inquilino</label>
        <input type="number" name="tenantId" value={formData.tenantId} onChange={handleChange} />
      </div>
      <div>
        <label>ID Propietario</label>
        <input type="number" name="landlordId" value={formData.landlordId} onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default PropertiesForm;
