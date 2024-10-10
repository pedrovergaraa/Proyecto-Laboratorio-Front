import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import React, { useState, useEffect } from 'react'
import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';
import { fetchAllProperties } from '../../services/SysAdminService';



const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Address', accessor: 'address' },
    { Header: 'Owner', accessor: 'ownerName' },
    { Header: 'Rent', accessor: 'rent' },
  ];

  return (
    <div>
      <Card title='Propiedades' FormComponent={PropertiesForm}>
        <Table columns={columns} data={properties} ></Table>
      </Card>
    </div>
  )
}

export default Properties
