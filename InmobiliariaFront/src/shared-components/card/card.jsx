import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css'; 
import ModalForm from '../modal/modalForm';


const Card = ({ title, children, FormComponent, formProps }) => {

  const [isModalOpen, setModalOpen] = useState(false); 

  const handleAddClick = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <div className="card-content">
          {children}
        </div>
        
        <button className="card-add-button" onClick={handleAddClick}>
          + Agregar
        </button>
      </div>
      {isModalOpen && (
        <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
          {FormComponent ? <FormComponent {...formProps} /> : null}
        </ModalForm>
      )}
    </div>
  );
};


Card.propTypes = {

  title: PropTypes.string.isRequired, // El título es obligatorio y debe ser un string
  children: PropTypes.node, // Los hijos pueden ser cualquier cosa que React pueda renderizar
  FormComponent: PropTypes.elementType.isRequired, // Recibe un componente de formulario
  formProps: PropTypes.object, // Props adicionales para el componente del formulario
};

export default Card;