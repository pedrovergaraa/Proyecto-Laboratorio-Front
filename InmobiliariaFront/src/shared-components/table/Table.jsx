import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css'; 
import EditIcon from '@mui/icons-material/Edit';  // Icono de edición
import DeleteIcon from '@mui/icons-material/Delete';  // Icono de eliminación

const Table = () => {
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'mail', accessor: 'mail' },
    { Header: 'Teléfono', accessor: 'phone' },
  ];

  const initialData = [
    { id: 1, name: 'Juan Pérez', mail: 'juan.perez@example.com', phone: '123-456-7890' },
    { id: 2, name: 'María González', mail: 'maria.gonzalez@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Carlos López', mail: 'carlos.lopez@example.com', phone: '555-123-4567' },
    { id: 4, name: 'Ana Martínez', mail: 'ana.martinez@example.com', phone: '321-654-9870' },
  ];

  const [data, setData] = useState(initialData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  // Handle Edit Modal
  const handleEdit = (row) => {
    setRowToEdit(row);
    setEditedRow(row); 
    setShowEditModal(true); 
  };

  const handleDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true); // Mostrar modal cuando se hace clic en eliminar
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== rowToDelete.id));
    setShowDeleteModal(false); // Cerrar el modal
  };

  const cancelDelete = () => {
    setRowToDelete(null); // Limpiar el registro seleccionado
    setShowDeleteModal(false); // Cerrar el modal sin eliminar
  };

  // Confirmación de la edición
  const confirmEdit = () => {
    setData(data.map(item => (item.id === editedRow.id ? editedRow : item)));
    setShowEditModal(false); // Cerrar el modal
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({
      ...editedRow,
      [name]: value,
    });
  };

  const cancelEdit = () => {
    setRowToEdit(null); // Limpiar el registro seleccionado
    setShowEditModal(false); // Cerrar el modal sin editar
  };

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación para eliminar */}
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


{/* Modal de edición */}
{showEditModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Editar Registro</h2>
      <form className="modal-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={editedRow.name}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="mail"
            value={editedRow.mail}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={editedRow.phone}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
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
};

export default Table;
