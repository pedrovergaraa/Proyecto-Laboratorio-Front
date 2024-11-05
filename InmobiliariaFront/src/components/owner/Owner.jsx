import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import OwnersForm from '../../forms/OwnersForm/OwnersForm';
import {
  fetchAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../services/OwnerService';

const Owner = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const data = await fetchAllOwners();
      setOwners(data);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  const handleCreate = async (newOwner) => {
    try {
      const createdOwner = await createOwner(newOwner);
      setOwners((prevOwners) => [...prevOwners, createdOwner]); // Agrega el nuevo Owner directamente
    } catch (error) {
      console.error("Error creating owner", error);
    }
  };

  const handleEdit = async (editedOwner) => {
    try {
      await updateOwner(editedOwner.id, editedOwner);
      loadOwners();
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
    } catch (error) {
      console.error("Error deleting owner", error);
    }
  };

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <Card 
      title="Usuarios inmobiliaria" 
      allowAdd={true} 
      FormComponent={() => <OwnersForm onAdd={handleCreate} />} // Asegúrate de pasar `onAdd` correctamente
    >
      <Table 
        columns={columns} 
        data={owners} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </Card>
  );
};

export default Owner;
