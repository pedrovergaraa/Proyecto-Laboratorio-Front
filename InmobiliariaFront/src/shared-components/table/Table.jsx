import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../searchBar/SearchBar';

import EditModal from '../editModal/EditModal';  
import DeleteModal from '../deleteModal/DeleteModal';  

const Table = ({ columns, data, onEdit, onDelete, showActions = true }) => {
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

  // Control de paginación
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="table-container">
      <SearchBar onSearch={handleSearch} showActions={showActions} />
      
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
            {showActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.accessor + index}>
                  {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                </td>
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

          {showActions && (

            <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
      )}

      {/* Modales */}
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        rowToEdit={rowToEdit}
        setRowToEdit={setRowToEdit} 
        handleSave={onEdit}
        cancelEdit={() => setShowEditModal(false)}
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
  showActions: PropTypes.bool, 
};

export default Table;