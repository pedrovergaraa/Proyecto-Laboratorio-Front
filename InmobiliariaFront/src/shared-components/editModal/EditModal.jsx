// EditModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditModal = ({ showEditModal, setShowEditModal, rowToEdit, handleInputChange, handleSave, confirmEdit, cancelEdit }) => {
  if (!showEditModal) return null;

    const preparedData = (data) => {
        const{id,password, role, ...filteredData} = data
        return filteredData
    }
    const dataForForm = preparedData(rowToEdit);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Registro</h2>
        <form className="modal-form" onSubmit={handleSave}>
          {Object.keys(dataForForm).map((key) => (
            <label key={key}>
              {key}:
              <input
                type={key === 'date' || key === 'endDate' ? 'date' :  key === 'password' ? 'password' : 'text' }
                name={key}
                value={rowToEdit[key] || ''}
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
  );
};

EditModal.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  setShowEditModal: PropTypes.func.isRequired,
  rowToEdit: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  confirmEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default EditModal;
