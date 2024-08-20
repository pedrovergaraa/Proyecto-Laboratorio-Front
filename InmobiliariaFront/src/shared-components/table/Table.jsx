import React from 'react';
import PropTypes from 'prop-types';
import './Table.css'; // Opcionalmente, puedes agregar estilos personalizados

const Table = () => {

  if (!value || value.length === 0) {
    return <p>No data available</p>;
  }
    return(
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Correo Electrónico</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Pérez</td>
              <td>28</td>
              <td>juan.perez@example.com</td>
              <td>Buenos Aires</td>
            </tr>
            <tr>
              <td>2</td>
              <td>María López</td>
              <td>34</td>
              <td>maria.lopez@example.com</td>
              <td>Córdoba</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carlos García</td>
              <td>42</td>
              <td>carlos.garcia@example.com</td>
              <td>Rosario</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Lucía Fernández</td>
              <td>25</td>
              <td>lucia.fernandez@example.com</td>
              <td>Mendoza</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Martín Rodríguez</td>
              <td>30</td>
              <td>martin.rodriguez@example.com</td>
              <td>La Plata</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

//Este es el codigo que iria conectado con el back

// const Table = ({ columns, data }) => {
//   if (!data || data.length === 0) {
//     return <p>No data available</p>;
//   }

//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.accessor}>{column.Header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {columns.map((column) => (
//               <td key={column.accessor}>{row[column.accessor]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

//export default Table;



export default Table;