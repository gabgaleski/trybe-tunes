import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { inputSearch, handleChange } = this.props;
    return (
      <div>
        <Header />
        <form>
          <input
            name="inputSearch"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            type="text"
            value={ inputSearch }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ (inputSearch.length < 2) }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Search;
