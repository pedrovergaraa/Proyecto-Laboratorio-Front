import React from 'react';
import PropTypes from 'prop-types';
import './Table.css'; // Opcionalmente, puedes agregar estilos personalizados

const Table = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
