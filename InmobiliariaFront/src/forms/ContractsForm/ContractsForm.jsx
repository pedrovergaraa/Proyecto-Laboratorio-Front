import React from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const ContractsForm = ({ onAdd }) => {

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
        <label>Tipo:</label>
        <input type="text" name="type" />
      </div>
      <div>
        <label>Fecha inicio:</label>
        <input type="date" name="address" />
      </div>
      <div>
        <label>Fecha fin:</label>
        <input type="date" name="email" />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default ContractsForm;