import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = ({
      listMusic: [],
      fav: true,
    });
  }

  componentDidMount() {
    this.favList();
  }

  favList = async () => {
    const listFav = await getFavoriteSongs();
    console.log(listFav);
    this.setState({
      listMusic: listFav,
    });
  }

  handleClick = () => {
    removeSong();
  }

  render() {
    const { listMusic, fav } = this.state;
    console.log(listMusic);
    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        {
          listMusic.map((songFav) => (
            <div key={ songFav }>
              <p>{ songFav.trackName }</p>

              <audio data-testid="audio-component" src={ songFav.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>

              <label
                htmlFor="favorite"
              >
                <input
                  data-testid={ `checkbox-music-${songFav.trackId}` }
                  type="checkbox"
                  id="favorite"
                  checked={ fav }
                  onClick={ this.handleClick }
                />
                Favorita
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Favorites;
