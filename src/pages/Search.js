import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputSearch: '',
    loading: false,
    album: [],
    title: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  searchChange = async () => {
    const { inputSearch } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const arrayObj = await searchAlbumsAPI(inputSearch);
        this.setState({
          inputSearch: '',
          loading: false,
          album: arrayObj,
          title:
 arrayObj.length > 0
   ? <p>{`Resultado de álbuns de: ${inputSearch}`}</p>
   : <p>Nenhum álbum foi encontrado</p>,
        });
      },
    );
  };

  render() {
    const carregando = <span>Carregando...</span>;
    const { inputSearch, loading, title, album } = this.state;
    const cards = album.map((element) => (
      <div key={ element.collectionId }>
        <img alt="Imagem do album" src={ element.artworkUrl100 } />
        <h3>{element.collectionName}</h3>
        <p>{element.artistName}</p>
        <Link
          to={ `/album/${element.collectionId}` }
          data-testid={ `link-to-album-${element.collectionId}` }
        >
          Music

        </Link>
      </div>));

    const forms = (
      <form>
        <input
          name="inputSearch"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          type="text"
          value={ inputSearch }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ (inputSearch.length < 2) }
          onClick={ this.searchChange }
        >
          Pesquisar
        </button>
      </form>);

    return (
      <div>
        <Header />
        {loading ? carregando : forms}
        {title}
        {cards}
      </div>
    );
  }
}

export default Search;
