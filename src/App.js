import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
/* import Album from './pages/Album';
import Favorites from './pages/Favorites'; */
import Home from './pages/Login';
import NotFound from './pages/NotFound';
/* import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search'; */

class App extends React.Component {
  render() {
    return (
      <main>
        <p>TrybeTuness</p>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/search" component={ Header } />
          <Route path="/album/:id" component={ Header } />
          <Route path="/favorites" component={ Header } />
          <Route path="/profile/edit" component={ Header } />
          <Route path="/profile" component={ Header } />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
