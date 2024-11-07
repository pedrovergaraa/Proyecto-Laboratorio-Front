import React, { useState } from "react";
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const LandlordsForm = ({ onAdd }) => {
  const [landlordData, setLandlordData] = useState({
    name: '',
    mail: '',
    password: '',
    propertyList: [] 
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado:', landlordData);  
    if (onAdd) {
      onAdd(landlordData);
      showSuccessToast("Propietario agregado con éxito!");
      setLandlordData({ name: '', mail: '', password: '', propertyList: [] });
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLandlordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={landlordData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="mail"
          value={landlordData.mail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={landlordData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Agregar</button>
      <ToastContainerComponent /> 
    </form>
  );
};

export default LandlordsForm;
