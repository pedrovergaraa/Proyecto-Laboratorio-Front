import React, { useState } from "react";
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const LandlordsForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const handleAddClick = async (event) => {
    event.preventDefault();

    const newLandlord = { name, mail };

    if (onAdd) {
      await onAdd(newLandlord);
      showSuccessToast("Usuario agregado con éxito!");
      setName(''); // Limpiar los campos
      setMail('');
    }
  };

  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Mail:</label>
        <input type="mail" name="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <button type="submit" onClick={handleAddClick}>Agregar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default LandlordsForm;
