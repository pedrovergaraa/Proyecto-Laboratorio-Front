// src/components/Card.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import ModalForm from '../modal/modalForm';

const Card = ({ title, children, FormComponent, formProps, allowAdd = true }) => {
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
        <div className="card-content">{children}</div>

        {/* Mostrar botón de agregar solo si allowAdd es true */}
        {allowAdd && (
          <button className="card-add-button" onClick={handleAddClick}>
            + Agregar
          </button>
        )}
      </div>
      {isModalOpen && allowAdd && (
        <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
          {FormComponent ? <FormComponent {...formProps} /> : null}
        </ModalForm>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  FormComponent: PropTypes.elementType,
  formProps: PropTypes.object,
  allowAdd: PropTypes.bool, // Prop para habilitar/deshabilitar el botón de agregar
};

export default Card;
