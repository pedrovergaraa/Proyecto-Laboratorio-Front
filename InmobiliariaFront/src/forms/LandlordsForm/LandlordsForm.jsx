import React from "react"
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const LandlordsForm = ({ onAdd }) =>{
  const handleAddClick = (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe

    if (onAdd) {
      onAdd(); // Ejecuta cualquier función que se pase a través de props
    }

    showSuccessToast("Usuario agregado con éxito!");
  };
    return(
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

export default LandlordsForm 