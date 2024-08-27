// ExampleForm.js
import React from 'react';

const propertiesForm = () => {
  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label>direccion</label>
        <input type="text" name="address" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default propertiesForm;



