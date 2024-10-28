import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const OwnersForm = ({ onAdd }) => {
  const [ownerData, setOwnerData] = useState({ name: '', email: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleAddClick = (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe

    if (onAdd) {
      onAdd(ownerData); // Pasa los datos del nuevo Owner a la función de callback
    }

    showSuccessToast("Usuario agregado con éxito!"); // Muestra la notificación de éxito
    setOwnerData({ name: '', email: '' }); // Limpia el formulario después de agregar
  };

  return (
    <form>
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
      <button type="submit" onClick={handleAddClick}>
        Agregar
      </button>
      <ToastContainerComponent />
    </form>
  );
};

export default OwnersForm;
