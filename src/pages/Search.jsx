import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      artistNameInput: '',
      loading: false,
      albuns: [],
      artist: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      artistNameInput: event.target.value,
      artist: event.target.value,
    });
  }

  handleClick = async () => {
    const { artistNameInput } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(artistNameInput);
    console.log(response);
    this.setState({
      artistNameInput: '',
      loading: false,
      albuns: response,
    });
  }

  render() {
    const { artistNameInput, loading, albuns, artist } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        {
          loading ? <Loading /> : (
            <>
              <input
                data-testid="search-artist-input"
                placeholder="Nome do artista"
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ artistNameInput.length < 2 }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>

            </>
          )
        }

        {
          albuns.length > 0 ? (
            <div>
              <h4>{`Resultado de álbuns de: ${artist}`}</h4>

              <div>
                {
                  albuns.map((disc) => (
                    <div key={ disc.collectionId }>
                      <img
                        src={ disc.artworkUrl100 }
                        alt={ disc.collectionName }
                      />
                      <p key={ disc.artistId }>{disc.artistName}</p>
                      <Link
                        to={ `/album/${disc.collectionId}` }
                        data-testid={ `link-to-album-${disc.collectionId}` }
                      >
                        Acesse o Album
                      </Link>
                      <p>{ disc.collectionName }</p>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : <h4>Nenhum álbum foi encontrado</h4>
        }
      </div>
    );
  }
}

export default Search;
