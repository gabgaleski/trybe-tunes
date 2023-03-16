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
      <form>
        <img data-testid="profile-image" src={ image } alt="Foto de perfil" />
        <h3>Nome</h3>
        <p>{name}</p>
        <h3>Email</h3>
        <p>{email}</p>
        <h3>Descrição</h3>
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </form>);
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {
          loading
            ? <Loading /> : form
        }
      </div>
    );
  }
}

export default Profile;
