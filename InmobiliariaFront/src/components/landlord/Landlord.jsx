import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';
import { fetchAllLandlords } from '../../services/LandlordService';

const Landlord = () => {
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    const fetchLandlords = async () => {
      const data = await fetchAllLandlords();
      setLandlords(data);
    };

    fetchLandlords();
  }, []);

  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Email', accessor: 'mail' },
    { Header: 'Propiedades', accessor: 'propertyList' },
  ];

  // Función para renderizar las propiedades
  const renderProperties = (properties) => {
    if (properties && properties.length > 0) {
      return properties.map((property) => (
        <div key={property.id}>
          <p> {property.description}</p>
          <p> {property.adress || 'No hay una direccion cargada'}</p>
        </div>
      ));
    }
    return <p>No properties available</p>;
  };

  // Convertir landlords en un formato adecuado para la tabla
  const data = landlords.map(landlord => ({
    id: landlord.id,
    mail: landlord.mail,
    propertyList: renderProperties(landlord.propertyList), // Renderizar propiedades aquí
  }));

  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm}>
        <Table columns={columns} data={data}></Table>
      </Card>
    </div>
  );
};

export default Landlord;
