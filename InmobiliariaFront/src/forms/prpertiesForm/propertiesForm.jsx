import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify'; // Descomentar si deseas usar Toastify

const PropertiesForm = ({ tenants, owners, onAdd }) => {
  // Estados para los campos del formulario
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');

  // Manejar el envío del formulario
  const handleAddClick = (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe

    if (onAdd) {
      const propertyData = {
        address,
        description,
        tenantEmail: selectedTenant,
        ownerEmail: selectedOwner,
      };
      onAdd(propertyData); // Ejecuta la función que se pasa a través de props
      // toast.success("Propiedad agregada correctamente!"); // Muestra la notificación de éxito
    }
  };

  return (
    <form onSubmit={handleAddClick}>
      <div>
        <label>Dirección:</label>
        <input 
          type="text" 
          name="address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea 
          name="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label>Inquilino:</label>
        <select 
          value={selectedTenant} 
          onChange={(e) => setSelectedTenant(e.target.value)}
        >
          <option value="">Seleccionar inquilino</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.email}>
              {tenant.email}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Propietario:</label>
        <select 
          value={selectedOwner} 
          onChange={(e) => setSelectedOwner(e.target.value)}
        >
          <option value="">Seleccionar propietario</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.email}>
              {owner.email}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Agregar</button>
      {/* <ToastContainer />  // Descomentar si usas Toastify */}
    </form>
  );
};

export default PropertiesForm;
