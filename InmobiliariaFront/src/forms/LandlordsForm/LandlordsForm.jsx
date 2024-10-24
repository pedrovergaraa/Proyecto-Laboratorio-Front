import React from "react"
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const LandlordsForm = ({ onAdd }) =>{
  const handleAddClick = (event) => {
    event.preventDefault(); 

    if (onAdd) {
      onAdd(); 
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
        <label>mail:</label>
        <input type="mail" name="mail" />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
    );
};

export default LandlordsForm 