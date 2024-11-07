import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, confirmDelete, cancelDelete }) => {
  if (!showDeleteModal) return null;

  return (
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
  );
};

DeleteModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
