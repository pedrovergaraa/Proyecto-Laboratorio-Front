import React from 'react';

const ContractsForm = () => {
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
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ContractsForm;