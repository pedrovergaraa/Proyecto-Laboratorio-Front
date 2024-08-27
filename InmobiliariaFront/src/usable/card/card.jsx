import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Opcionalmente, puedes agregar estilos personalizados
import ModalForm from '../modalForm/modalForm'


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
      {/* Aquí se renderiza el ModalForm y se pasa FormComponent como contenido */}
      <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormComponent />
      </ModalForm>
    </div>
  );
};

// Definir los tipos de prop
Card.propTypes = {
  title: PropTypes.string.isRequired, // El título es obligatorio y debe ser un string
  children: PropTypes.node, // Los hijos pueden ser cualquier cosa que React pueda renderizar
  FormComponent: PropTypes.elementType.isRequired, // Recibe un componente de formulario
};

export default Card;
