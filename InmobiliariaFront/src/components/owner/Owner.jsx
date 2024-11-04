// src/components/Owner.jsx
import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/Card';
import OwnersForm from '../../forms/OwnersForm/OwnersForm'; // Asegúrate de importar correctamente OwnersForm
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
      await createOwner(newOwner);
      loadOwners(); // Recargar la lista de owners
    } catch (error) {
      console.error("Error creating owner", error);
    }
  };

  const handleEdit = async (editedOwner) => {
    try {
      await updateOwner(editedOwner);
      loadOwners();
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id);
      loadOwners();
    } catch (error) {
      console.error("Error deleting owner", error);
    }
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <Card title="Lista de Inmobiliarias" allowAdd={true} FormComponent={OwnersForm} onAdd={handleCreate}>
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
