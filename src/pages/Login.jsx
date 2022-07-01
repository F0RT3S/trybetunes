import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  saveName = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { userName, loading, redirect } = this.state;
    const TRES = 3;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <input
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ userName.length < TRES }
                onClick={ this.saveName }
              >
                Entrar
              </button>
            </form>
          )
        }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Home;
