import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      artistNameInput: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      artistNameInput: event.target.value,
    });
  }

  render() {
    const { artistNameInput } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <input
          data-testid="search-artist-input"
          placeholder="Nome do artista"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ artistNameInput.length < 2 }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
