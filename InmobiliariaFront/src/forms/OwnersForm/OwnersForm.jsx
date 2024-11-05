import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const OwnersForm = ({ onAdd }) => {
  const [ownerData, setOwnerData] = useState({ name: '', email: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleAddClick = async (event) => {
    event.preventDefault();

    if (onAdd) {
      await onAdd(ownerData);
      showSuccessToast("Owner agregado con éxito!"); // Muestra la notificación de éxito
      setOwnerData({ name: '', email: '' }); // Limpia el formulario después de agregar
    }
  };

  return (
    <form onSubmit={handleAddClick}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={ownerData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={ownerData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
      <ToastContainerComponent /> {/* Asegúrate de que esto esté aquí */}
    </form>
  );
};

export default OwnersForm;
