import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    userInfo: {},
    loading: true,
  };

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI = async () => {
    const user = await getUser();
    this.setState({
      userInfo: user,
      loading: false,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    const { name, image, email, description } = userInfo;
    const form = (
      <form className="form-profile">
        <div>
          <img data-testid="profile-image" src={ image } alt="Foto de perfil" />
          <div className="info-card">
            <h3>Nome</h3>
            <p>{name}</p>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
          <div className="info-card">
            <h3>Descrição</h3>
            <p>{description}</p>
          </div>
          <div className="div-linkProfile">
            <Link className="link-profileEdit" to="/profile/edit">Editar perfil</Link>
          </div>
        </div>
      </form>);
    return (
      <div data-testid="page-profile" className="search-container">
        <Header />
        <div>
          <div className="header-favorite">
            <h1>Profile</h1>
          </div>
          { loading ? <Loading /> : form }
        </div>
      </div>
    );
  }
}

export default Profile;
