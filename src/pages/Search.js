import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

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
   ? <p className="album-result">{`Resultado de álbuns de: ${inputSearch}`}</p>
   : <p className="album-result">Nenhum álbum foi encontrado</p>,
        });
      },
    );
  };

  render() {
    const { inputSearch, loading, title, album } = this.state;
    const cards = album.map((element) => (
      <div className="card" key={ element.collectionId }>
        <img alt="Imagem do album" src={ element.artworkUrl100 } />
        <h3>{element.collectionName}</h3>
        <p>{element.artistName}</p>
        <Link
          className="links-musics"
          to={ `/album/${element.collectionId}` }
          data-testid={ `link-to-album-${element.collectionId}` }
        >
          Musics

        </Link>
      </div>));

    const forms = (
      <form className="search-form">
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
          Procurar
        </button>
      </form>);
    if (loading) return <Loading />;
    return (
      <div className="search-container" data-testid="page-search">
        <Header />
        <div>
          {forms}
          <div className="cards-container">
            {title}
            <div className="cards-division">
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
