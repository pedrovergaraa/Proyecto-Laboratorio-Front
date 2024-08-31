import React from "react"

const LandlordForm = () =>{
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
      <button type="submit">Agregar</button>
    </form>
    );
};

export default LandlordForm 