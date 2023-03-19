import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logo from '../img/logo.png';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    loading: false,
  };

  changePage = async () => {
    const { inputName, history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: inputName });
        history.push('/search');
        this.setState({
          loading: false,
        });
      },
    );
  };

  render() {
    const maxLength = 3;
    const { handleChange, inputName } = this.props;
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="login-container" data-testid="page-login">
        <div className="div-login">
          <img src={ logo } alt="Logo" />
          <h1>
            Trybe
            {' '}
            <span className="title-span">tunes</span>
          </h1>
          <input
            data-testid="login-name-input"
            name="inputName"
            type="text"
            placeholder="Qual é o seu nome?"
            onChange={ handleChange }
            value={ inputName }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ (inputName.length < maxLength) }
            onClick={ this.changePage }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
