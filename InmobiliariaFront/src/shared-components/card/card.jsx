// Card.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css'; 
import ModalForm from '../modal/modalForm';


const Card = ({ title, children, FormComponent }) => {
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
      {/* Renderiza ModalForm solo si está abierto y pasa FormComponent como contenido */}
      {isModalOpen && (
        <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
          {FormComponent ? <FormComponent /> : null}
        </ModalForm>
      )}
    </div>
  );
};


Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node, 
  FormComponent: PropTypes.elementType.isRequired,
};

export default Card;