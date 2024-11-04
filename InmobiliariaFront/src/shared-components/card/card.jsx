// src/components/Card.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import ModalForm from '../modal/modalForm';
import { useLocation } from 'react-router-dom';

const Card = ({ title, children, FormComponent, formProps, allowAdd = true }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();


  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isUserTenantRoute = location.pathname === '/user-tenant';
  const isUserLandLordRoute = location.pathname === '/user-landlord';

  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <div className="card-content">
          {children}
        </div>
        
        
        {!isUserTenantRoute && !isUserLandLordRoute && (
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
