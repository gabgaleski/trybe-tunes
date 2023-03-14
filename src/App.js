import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

class App extends React.Component {
  state = {
    inputName: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { inputName } = this.state;
    return (
      <>
        <div data-testid="page-login">
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              handleChange={ this.handleChange }
              inputName={ inputName }
              { ...props }
            />) }
          />
        </div>
        <div data-testid="page-search">
          <Route
            exact
            path="/search"
            component={ Search }
          />
        </div>
        <div data-testid="page-album">
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        </div>
        <div data-testid="page-favorites">
          <Route exact path="/favorites" component={ Favorites } />
        </div>
        <div data-testid="page-profile">
          <Route exact path="/profile" component={ Profile } />
        </div>
        <div data-testid="page-profile-edit">
          <Route exact path="/profile/edit" component={ ProfileEdit } />
        </div>
        <div data-testid="page-not-found">
          <Route path="*" component={ NotFound } />
        </div>
      </>
    );
  }
}

export default App;
