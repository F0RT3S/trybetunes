import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  render() {
    const { userName } = this.state;
    const TRES = 3;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ userName.length < TRES }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Home;
