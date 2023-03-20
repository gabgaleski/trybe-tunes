import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    name: '',
    image: '',
    email: '',
    description: '',
  };

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI = async () => {
    const user = await getUser();
    const { description, email, image, name } = user;
    this.setState({
      loading: false,
      description,
      name,
      email,
      image,
    });
  };

  saveInfo = async () => {
    const { history } = this.props;
    console.log(this.props);
    this.setState({
      loading: true,
    });
    const { name, email, description, image } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    await updateUser(obj);
    this.setState({
      loading: false,
    });
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { loading } = this.state;
    const { name, image, email, description } = this.state;
    const isValid = email.length > 0
    && name.length > 0 && image.length > 0 && description.length > 0;
    const formInfo = (
      <form className="form-edit-profile">
        <div>
          <label htmlFor="image">
            Foto
            <input
              placeholder="URL da foto"
              id="image"
              name="image"
              data-testid="edit-input-image"
              type="text"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              placeholder="Alterar Nome"
              id="name"
              name="name"
              data-testid="edit-input-name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              placeholder="Alterar Email"
              id="email"
              name="email"
              data-testid="edit-input-email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição
            <textarea
              placeholder="Alterar Descrição"
              id="description"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          disabled={ !isValid }
          onClick={ () => this.saveInfo() }
          data-testid="edit-button-save"
        >
          Salvar

        </button>
      </form>);

    return (
      <div className="search-container" data-testid="page-profile-edit">
        <Header />
        <div>
          <div className="header-favorite">
            <h1>Profile Edit</h1>
          </div>
          {
            loading
              ? <Loading /> : formInfo
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;
