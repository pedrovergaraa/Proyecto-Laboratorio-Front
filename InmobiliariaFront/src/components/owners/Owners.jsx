import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';

const Owners = () => {
  const [owners, setOwners] = useState([]);

<<<<<<< HEAD
=======

  const getAllOwners = async (owners) => {
    try {
      const response = await fetch(`http://localhost:8080/Admin/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  

>>>>>>> 5edb6395f28c5ecfa3b22c943c03ff45a2b42c3e
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Admin ID', accessor: 'adminId' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOwners();
      if (data) {
        setOwners(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Owners</h1>
      <Card title="Owners">
        <Table columns={columns} data={owners} />
      </Card>
    </div>
  );
};

export default Owners;
