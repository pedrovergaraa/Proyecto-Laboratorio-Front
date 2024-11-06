import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Table = ({ columns, data, onEdit, onDelete, showActions = true }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState(''); // Almacena el término de búsqueda

  useEffect(() => {
    setFilteredData(data); // Actualiza los datos filtrados cuando los datos originales cambian
  }, [data]);

  // Handle Edit Modal
  const handleEdit = (row) => {
    setRowToEdit(row);
    setEditedRow(row);
    setShowEditModal(true);
  };

  const handleDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(rowToDelete.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmEdit = () => {
    onEdit(editedRow);
    setRowToEdit(null);
    setEditedRow(null);
    setShowEditModal(false);
  };
  
  const cancelEdit = () => {
    setRowToEdit(null);
    setEditedRow(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({
      ...editedRow,
      [name]: value,
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrado y ordenación de datos según el término de búsqueda y orden descendente
  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();

    const filtered = data
      .filter((row) =>
        Object.values(row).some(
          (value) => String(value).toLowerCase().includes(lowercasedTerm)
        )
      )
      .sort((a, b) => {
        const firstValue = String(a.email || a.entityType || '').toLowerCase();
        const secondValue = String(b.email || b.entityType || '').toLowerCase();
        return secondValue.localeCompare(firstValue); // Orden descendente
      });

    setFilteredData(filtered);
  };

  return (
    <div className="table-container">
      {/* Barra de búsqueda y botón de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Buscar..."
        />
        <button id='search-button' onClick={handleSearch}>Buscar</button>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
            {showActions && <th>Acciones</th>} {/* Mostrar solo si showActions es true */}
          </tr>
        </thead>
      
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                </td>
              ))}
              {showActions && ( /* Mostrar solo si showActions es true */
                <td className="action-icons">
                  <EditIcon
                    className="edit-icon"
                    onClick={() => handleEdit(row)}
                    style={{ cursor: 'pointer', color: '#1976d2' }}
                  />
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDelete(row)}
                    style={{ cursor: 'pointer', color: '#d32f2f' }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este registro?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="accept-button">Aceptar</button>
              <button onClick={cancelDelete} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Registro</h2>
            <form className="modal-form">
              {columns.map((column) => (
                <label key={column.accessor}>
                  {column.Header}:
                  <input
                    type="text"
                    name={column.accessor}
                    value={editedRow[column.accessor] || ''}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </label>
              ))}
              <div className="modal-buttons">
                <button type="button" onClick={confirmEdit} className="accept-button">Guardar</button>
                <button type="button" onClick={cancelEdit} className="cancel-button">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showActions: PropTypes.bool, // Prop para controlar la visibilidad de la columna de acciones
};

export default Table;
