import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Llama a la función onSearch para pasar el término de búsqueda
  };

  return (
    <div className="search-bar">
      <input
        className="search-input" // Asegúrate de que esta clase esté definida en tu CSS
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange} // Usa la función correcta
        placeholder="Buscar..."
      />
      <button id='search-button' onClick={() => onSearch(searchTerm)}>Buscar</button> {/* Ajuste aquí */}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
