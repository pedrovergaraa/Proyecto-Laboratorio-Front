// OwnersForm.jsx
import React from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const OwnersForm = ({ onAdd }) => {
    const handleAddClick = (event) => {
        event.preventDefault(); // Prevenir que el formulario se envíe
    
        if (onAdd) {
          onAdd(); // Ejecuta cualquier función que se pase a través de props
        }
    
        showSuccessToast("Usuario agregado con éxito!");
      };
  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default OwnersForm; // Asegúrate de que sea "export default"
