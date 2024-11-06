import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../searchBar/SearchBar';
import EditModal from '../editModal/EditModal';  // Importa el modal de edición
import DeleteModal from '../deleteModal/DeleteModal';  // Importa el modal de eliminación

const Table = ({ columns, data, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);



  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  console.log("sdsa", currentRows)
  const handleEdit = (row) => {
    setRowToEdit(row);  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter((row) =>
      Object.values(row).some(
        (value) => String(value).toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="table-container">
      <SearchBar onSearch={handleSearch} />
      
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
          {currentRows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                console.log("pene", row[column.accessor])
                return(
                <td key={column.accessor}>
                  {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                </td>
              )})}
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

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>

      {/* Modales */}
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        rowToEdit={rowToEdit}
        confirmEdit={() => onEdit(rowToEdit)} // Pasamos la función de edición desde el componente padre
        cancelEdit={() => setShowEditModal(false)}  // Cerramos el modal sin guardar cambios
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
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
