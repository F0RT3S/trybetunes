import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.reqFavorites();
  }

  favoriteSong = async ({ target }) => {
    const { checked } = target;
    const { object } = this.props;
    this.setState({
      loading: true,
    });
    // console.log(object);
    await addSong(object);
    this.setState({
      loading: false,
      favorited: checked,
    });
  }

  reqFavorites = async () => {
    const { object } = this.props;
    const response = await getFavoriteSongs(object);
    const responseFav = response.some((music) => (object.trackName === music.trackName));
    // console.log(responseFav);
    this.setState({
      favorited: responseFav,
    });
  }

  render() {
    // console.log(this.props);
    const { object } = this.props;
    const { trackName, previewUrl, trackId } = object;
    const { loading, favorited } = this.state;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div>
              <p>{ trackName }</p>

              <audio data-testid="audio-component" src={ previewUrl } controls>
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
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="favorite"
                  onChange={ this.favoriteSong }
                  checked={ favorited }
                />
                Favorita
              </label>
            </div>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  object: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
