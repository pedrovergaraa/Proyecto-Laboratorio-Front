import React, { useState } from 'react';
import { showSuccessToast } from '../..//shared-components/notifiaction/AddUser';

const OwnersForm = ({ onAdd }) => {
  const [ownerData, setOwnerData] = useState({ name: '', email: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onAdd) {
      onAdd(ownerData); // Llama a la función `onAdd` pasada como prop
      showSuccessToast("Owner agregado con éxito!");
      setOwnerData({ name: '', email: '' }); // Limpia el formulario
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
          name="email"
          value={ownerData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default OwnersForm;
