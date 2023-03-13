import React from 'react';
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
      </header>
    );
  }
}

export default Header;
