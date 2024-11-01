import React, { useState } from "react";
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const TenantsForm = ({ onAdd }) => {
  const [name, setName] = useState(""); // Estado para el nombre
  const [mail, setMail] = useState(""); // Estado para el email

  const handleAddClick = (event) => {
    event.preventDefault(); 

    // Crea el objeto del nuevo inquilino
    const newTenant = { name, mail };

    if (onAdd) {
      onAdd(newTenant); // Pasa el nuevo inquilino a la función onAdd
    }

    // Muestra la notificación de éxito
    showSuccessToast("Inquilino agregado con éxito!");
    
    // Resetea los campos del formulario
    setName("");
    setMail("");
  };

  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Maneja el cambio en el input
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="mail" 
          value={mail} 
          onChange={(e) => setMail(e.target.value)} // Maneja el cambio en el input
        />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default TenantsForm;
