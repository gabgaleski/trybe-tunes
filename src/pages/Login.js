import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

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
    return (
      <div>
        <h1>Login</h1>
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
        {loading && <span>Carregando...</span>}
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
