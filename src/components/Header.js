import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../img/logo.png';
import search from '../img/search.png';
import favoritos from '../img/favoritos.png';
import perfil from '../img/profile-icon.png';

class Header extends React.Component {
  state = {
    loading: false,
    name: '',
  };

  componentDidMount() {
    this.loadingName();
  }

  loadingName = () => {
    this.setState(
      { loading: true },
      async () => {
        const loading = await getUser();
        const { name } = loading;
        this.setState({
          loading: false,
          name,
        });
      },

    );
  };

  render() {
    const { loading, name } = this.state;
    const carregando = <span>Carregando...</span>;
    return (
      <header className="header-class" data-testid="header-component">
        <div>
          <img src={ logo } alt="Logo" />
          <h1>
            Trybe
            {' '}
            <span className="title-span">tunes</span>
          </h1>
        </div>
        <div className="links-container">
          <div className="links-div">
            <img src={ search } alt="Lupa" />
            <Link
              className="links"
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisa

            </Link>
          </div>
          <div className="links-div">
            <img src={ favoritos } alt="Estrela" />
            <Link
              className="links"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritas

            </Link>
          </div>
          <div className="links-div">
            <img src={ perfil } alt="Icone de perfil" />
            <Link
              className="links"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>
        </div>
        {loading ? carregando
          : <div className="header-name">
            <img src={ perfil } alt="Icone de perfil" />
            <p data-testid="header-user-name">{name}</p>
            </div>}
      </header>
    );
  }
}

export default Header;
