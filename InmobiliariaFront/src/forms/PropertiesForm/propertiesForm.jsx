// ExampleForm.js
import React from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const PropertiesForm = ({ onAdd, onClose }) => {
  const handleAddClick = (event) => {
    event.preventDefault(); 

    if (onAdd) {
      onAdd();
    }

    showSuccessToast("Usuario agregado con éxito!");

    if (onClose) {
      onClose(); // Cierra el modal padre
    }
  };

  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label>Direccion:</label>
        <input type="text" name="address" />
      </div>
      <div>
        <label>mail:</label>
        <input type="mail" name="mail" />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default PropertiesForm;
