import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Opcionalmente, puedes agregar estilos personalizados
import ModalForm from '../modal/modalForm';
import WeatherApi from '../../components/weather/WeatherApi';


const Card = ({ title, children, FormComponent, formProps }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal

  const handleAddClick = () => {
    setModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
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
          {/* Renderiza el FormComponent con sus props si existe */}
          {FormComponent ? <FormComponent {...formProps} /> : null}
        </ModalForm>
      )}
    </div>
  );
};

// Definir los tipos de prop
Card.propTypes = {
  title: PropTypes.string.isRequired, // El título es obligatorio y debe ser un string
  children: PropTypes.node, // Los hijos pueden ser cualquier cosa que React pueda renderizar
  FormComponent: PropTypes.elementType.isRequired, // Recibe un componente de formulario
  formProps: PropTypes.object, // Props adicionales para el componente del formulario
};

export default Card;