import React, { useState, useEffect } from "react";
import OwnersForm from "../../forms/OwnersForm/OwnersForm";
import Card from "../../shared-components/card/card";
import Table from "../../shared-components/table/Table";
// import { getAllOwners, createOwner } from "../../services/OwnerService";

 const Owners = () => {
//   const [owners, setOwners] = useState([]);

//   useEffect(() => {
//     const fetchOwners = async () => {
//       try {
//         const data = await getAllOwners();
//         setOwners(data);
//       } catch (error) {
//         console.error("Error fetching owners:", error);
//       }
//     };

//     fetchOwners();
//   }, []);

//   const handleAddOwner = async (newOwnerData) => {
//     try {
//       const createdOwner = await createOwner(newOwnerData);
//       setOwners([...owners, createdOwner]); // Actualiza la lista de Owners
//     } catch (error) {
//       console.error("Error creating owner:", error);
//     }
//   };

//   // Define las columnas para la tabla de Owners
//   const columns = [
//     { Header: "ID", accessor: "id" },
//     { Header: "Nombre", accessor: "name" },
//     { Header: "Correo Electrónico", accessor: "email" },
//     { Header: "Rol", accessor: "role" },
//     { Header: "Admin ID", accessor: "admin.id" },
//   ];

  return (
    <div>
      <Card
        title="Inmobiliaria"
        FormComponent={OwnersForm}
        formProps={{ onAdd: handleAddOwner }} // Pasamos la función como prop
      >
        {/* Tabla que muestra los Owners */}
        <Table columns={columns} data={owners} />
      </Card>
    </div>
  );
};

export default Owners;
