import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  componentDidMount() {
    getUser();
  }

  render() {
    return (
      <header
        data-testid="header-component"
      >
        Header
      </header>
    );
  }
}

export default Header;
