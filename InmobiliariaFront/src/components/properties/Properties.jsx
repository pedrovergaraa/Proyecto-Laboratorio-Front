// import Card from '../../shared-components/card/card';
// import Table from '../../shared-components/table/Table';
// import React, { useState, useEffect } from 'react'
// import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';
// import { fetchAllProperties } from '../../services/SysAdminService';



// const Properties = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     console.log("Fetching properties...");
//     const fetchProperties = async () => {
//       try {
//         const data = await fetchAllProperties();
//         setProperties(data);
//         console.log("Properties fetched:", data);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
  
//     fetchProperties();
//   }, []);
  
//   console.log("Rendering Properties component...");
  

//   // Definir las columnas para la tabla
//   const columns = [
//     { Header: 'Address', accessor: 'address' },
//     { Header: 'Owner', accessor: 'ownerName' },
//     { Header: 'Rent', accessor: 'rent' },
//   ];

//   return (
//     <div>
//       <Card title="Propiedades" FormComponent={PropertiesForm}>
//         {properties.length > 0 ? (
//           <Table columns={columns} data={properties} />
//         ) : (
//           <p>No hay datos disponibles</p>
//         )}
//       </Card>
//     </div>
//   );
  
// }

// export default Properties

import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import React, { useState, useEffect } from 'react';
import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';
import { fetchAllProperties } from '../../services/SysAdminService';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching properties...");
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
        console.log("Properties fetched:", data);
      } catch (error) {
        setError("Error fetching properties");
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);
  
  console.log("Rendering Properties component...");
  
  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Address', accessor: 'address' },
    { Header: 'Owner', accessor: 'ownerName' },
    { Header: 'Rent', accessor: 'rent' },
  ];

  return (
    <div>
      <Card title="Propiedades" FormComponent={PropertiesForm}>
        {loading ? (
          <p>Cargando propiedades...</p> // Aquí puedes agregar un spinner o un indicador de carga
        ) : error ? (
          <p>{error}</p>
        ) : properties.length > 0 ? (
          <Table columns={columns} data={properties} />
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </Card>
    </div>
  );
}

export default Properties;
