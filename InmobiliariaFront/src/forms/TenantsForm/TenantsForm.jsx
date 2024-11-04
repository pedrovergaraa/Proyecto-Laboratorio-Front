import React, { useState, useEffect } from "react";
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const TenantsForm = ({ onAdd, onEdit, selectedTenant, clearSelectedTenant }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    if (selectedTenant) {
      setName(selectedTenant.name || "");
      setMail(selectedTenant.mail || "");
    }
  }, [selectedTenant]);

  const handleAddClick = (event) => {
    event.preventDefault();
    const tenantData = { name, mail };

    if (selectedTenant) {
      onEdit({ ...tenantData, id: selectedTenant.id });
      showSuccessToast("Inquilino actualizado con éxito!");
      clearSelectedTenant();
    } else {
      onAdd(tenantData);
      showSuccessToast("Inquilino agregado con éxito!");
    }

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
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="mail" 
          value={mail} 
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleAddClick}>
        {selectedTenant ? "Actualizar" : "Agregar"}
      </button>
      <ToastContainerComponent />
    </form>
  );
};

export default TenantsForm;
