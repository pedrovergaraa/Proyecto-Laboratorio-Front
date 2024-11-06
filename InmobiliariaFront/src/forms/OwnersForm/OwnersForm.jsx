import React, { useState } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const OwnersForm = ({ onAdd, closeModal }) => {  // Recibe closeModal como prop para cerrar el modal
  const [ownerData, setOwnerData] = useState({
    name: '',
    mail: '',
    adminId: '1',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onAdd) {
      onAdd(ownerData);  // Agrega el nuevo propietario
      showSuccessToast("Owner agregado con éxito!");  // Muestra la notificación de éxito
      setOwnerData({ name: '', mail: '', adminId: '1', password: '' });  // Limpia los datos del formulario
      closeModal();  // Cierra el modal después de agregar el propietario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          name="mail"
          value={ownerData.mail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={ownerData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default OwnersForm;
