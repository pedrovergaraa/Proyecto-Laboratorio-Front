import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Opcionalmente, puedes agregar estilos personalizados
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ title, children, onAdd }) => {

  const handleAddClick = () => {
    if (onAdd) {
      onAdd(); // Ejecuta cualquier función que se pase a través de props
    }
    toast.success("Usuario agregado corectamente!"); // Muestra la notificación de éxito
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
        <button className="card-add-button" onClick={handleAddClick} >
          + Agregar
        </button>
        <div>
        <ToastContainer />
        </div>
      </div>
    </div>
  );
};


// Event: id, fecha, tenantId, propertyId, landlordId
// pagos: lo mismo + monto
// contrato: lo mismo + fechaFinal

// Definir los tipos de prop
Card.propTypes = {
  title: PropTypes.string.isRequired, // El título es obligatorio y debe ser un string
  children: PropTypes.node, // Los hijos pueden ser cualquier cosa que React pueda renderizar
  onAdd: PropTypes.func, // Función opcional para manejar el evento de click del botón
};

export default Card;
