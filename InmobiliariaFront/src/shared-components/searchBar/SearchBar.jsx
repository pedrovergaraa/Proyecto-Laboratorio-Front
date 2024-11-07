import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ onSearch, showActions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      {showActions && (

        <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Buscar..."
        />
      )}
      {/* Renderizar el botón solo si showActions es verdadero */}
        {showActions && (
        <button id="search-button" onClick={() => onSearch(searchTerm)}>
          Buscar
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  showActions: PropTypes.bool, // Añadimos showActions como prop
};

export default SearchBar;