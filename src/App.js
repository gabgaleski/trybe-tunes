import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <Switch>

        <Route
          exact
          path="/"
          render={ (props) => (<Login
            handleChange={ this.handleChange }
            inputName={ inputName }
            { ...props }
          />) }
        />
        <Route
          exact
          path="/search"
          component={ Search }
        />
        <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
