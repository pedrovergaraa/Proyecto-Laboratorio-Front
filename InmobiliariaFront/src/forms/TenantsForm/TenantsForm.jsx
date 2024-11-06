import React, { useState } from 'react';
import { showSuccessToast } from '../../shared-components/notifiaction/AddUser'; // Asegúrate de que esta función esté bien definida

const TenantForm = ({ onAdd }) => {

  const [tenantData, setTenantData] = useState({ name: '', mail: '', password: '', ownerId: '4' });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTenantData({ ...tenantData, [name]: value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (onAdd) {
      onAdd(tenantData);
    }
    showSuccessToast("Inquilino agregado con éxito!"); 
    setTenantData({ name: '', mail: '', password: '' , ownerId: '4'}); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={tenantData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="mail"
          value={tenantData.mail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={tenantData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar Inquilino</button>
    </form>
  );
};

export default TenantForm;
