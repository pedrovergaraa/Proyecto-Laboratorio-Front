import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css'; 
import ModalForm from '../modal/modalForm';
import { useLocation } from 'react-router-dom';

const Card = ({ title, children, FormComponent, formProps }) => {
  const location = useLocation(); 
  const [isModalOpen, setModalOpen] = useState(false); 

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
      {isModalOpen && (
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
  FormComponent: PropTypes.elementType.isRequired, 
  formProps: PropTypes.object, 
};

export default Card;
