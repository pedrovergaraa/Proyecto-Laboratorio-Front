// ExampleForm.js
import React from 'react';
// import { ToastContainer } from 'react-toastify';

const propertiesForm = () => {

  // const handleAddClick = (event) => {
  //   event.preventDefault(); // Prevenir que el formulario se envíe

  //   if (onAdd) {
  //     onAdd(); // Ejecuta cualquier función que se pase a través de props
  //   }

<<<<<<< HEAD
=======
  
>>>>>>> e367c5478c7dff2e941256de822c3a154986f39e
  //   toast.success("Usuario agregado correctamente!"); // Muestra la notificación de éxito
  // };
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
        <label>Email:</label>
        <input type="email" name="email" />
      </div>
      <button type="submit">Agregar</button>
      {/* <div>
      <ToastContainer />
      </div> */}
    </form>
  );
};

export default propertiesForm;



