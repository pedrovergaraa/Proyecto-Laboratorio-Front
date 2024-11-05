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

  const columns = [
    { Header: 'Email', accessor: 'mail' },
    { Header: 'Propiedades', accessor: 'propertyList' },
  ];

  const renderPropertiesDropdown = (properties) => {
    if (properties && properties.length > 0) {
      return (
        <details className="property-dropdown">
          <summary>Ver Propiedades</summary>
          {properties.map((property) => (
            <div key={property.id} className="property-item">
              <p><strong>Descripción:</strong> {property.description}</p>
              <p><strong>Dirección:</strong> {property.address || 'No hay una dirección cargada'}</p>
            </div>
          ))}
        </details>
      );
    }
    return <p>No hay propiedades disponibles</p>;
  };

  const data = landlords.map(landlord => ({
    id: landlord.id,
    mail: landlord.mail,
    propertyList: renderPropertiesDropdown(landlord.propertyList),
  }));

  const handleEdit = (updatedRow) => {
    // Lógica para manejar la edición de un propietario
  };

  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de un propietario
  };

  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm}>
        <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
    </div>
  );
};

export default Landlord;
