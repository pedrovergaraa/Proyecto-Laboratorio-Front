import React from "react"

const TenantsForm = () =>{
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

export default TenantsForm 