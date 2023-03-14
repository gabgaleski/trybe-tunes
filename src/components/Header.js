import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        {loading ? carregando : <p data-testid="header-user-name">{name}</p>}
        <div>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;
