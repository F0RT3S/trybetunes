import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.loadingGetUser(); // Como não posso colocar async no didMount, tive que criar outra função (Mentoria Estruturada Gabs)
  }

  loadingGetUser = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    // console.log(response);
    this.setState({
      loading: false,
      name: response.name,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {
          loading ? <Loading /> : (
            <p data-testid="header-user-name">
              Bem vindo(a),
              {' '}
              {name}
            </p>
          )
        }
      </header>
    );
  }
}

export default Header;
