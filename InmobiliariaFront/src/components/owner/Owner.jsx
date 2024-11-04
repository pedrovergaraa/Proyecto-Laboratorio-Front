// src/components/Owner.jsx
import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/card';
import {
  fetchAllOwners, // Asegúrate de implementar esta función en OwnerService
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../services/OwnerService';

const Owner = () => {
  const [allOwners, setAllOwners] = useState([]);
  const [currentOwner, setCurrentOwner] = useState({ id: null, name: '', mail: '' }); // Suponiendo que `email` es uno de los campos
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadAllOwners();
  }, []);

  const loadAllOwners = async () => {
    try {
      const owners = await fetchAllOwners(); // Asegúrate de que esta función devuelva la lista de propietarios
      setAllOwners(owners);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  const handleCreate = async (newOwner) => {
    try {
      await createOwner(newOwner);
      loadAllOwners();
    } catch (error) {
      console.error("Error creating owner", error);
    }
  };

  const handleEdit = async (editedOwner) => {
    try {
      await updateOwner(editedOwner.id, editedOwner);
      loadAllOwners();
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id);
      loadAllOwners();
    } catch (error) {
      console.error("Error deleting owner", error);
    }
  };

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <Card title="Propietarios Inmobiliaria" allowAdd={true} onAdd={handleCreate}>
      <Table 
        columns={columns} 
        data={allOwners} 
        onEdit={setCurrentOwner} // Asignamos el propietario a editar
        onDelete={handleDelete} 
      />
    </Card>
  );
};

export default Owner;
