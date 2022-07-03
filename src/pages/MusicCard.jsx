import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorited: false,
    };
  }

  favoriteSong = async () => {
    const { song } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(song);
    this.setState({
      loading: false,
      favorited: true,
    });
  }

  render() {
    // console.log(this.props);
    const { trackName, previewUrl, trackId } = this.props;
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
                  onClick={ this.favoriteSong }
                  defaultChecked={ favorited }
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
  song: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
