import React from 'react';
import PropTypes from 'prop-types';

const EditModal = ({
  showEditModal,
  setShowEditModal,
  setRowToEdit,
  rowToEdit,
  handleSave,
  cancelEdit,
}) => {
  if (!showEditModal) return null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRowToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const preparedData = (data) => {
    const { id, tenantList, propertyList , landlordList, role,property, ...filteredData } = data;
    return filteredData;
  };

  const dataForForm = preparedData(rowToEdit);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Registro</h2>
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          {Object.keys(dataForForm).map((key) => (
            <label key={key}>
              {key}:
              <input
                type={
                  key === "date" || key === "endDate"
                    ? "date"
                    : key === "password"
                    ? "password"
                    : "text"
                }
                name={key}
                value={dataForForm[key] || ""}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>
          ))}
          <div className="modal-buttons">
           <button
            type="button"
            onClick={() => handleSave(rowToEdit)} 
            className="accept-button"
          >
            Guardar
          </button>

            <button type="button" onClick={cancelEdit} className="cancel-button">
              Cancelar
            </button>
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
  handleSave: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default EditModal;
