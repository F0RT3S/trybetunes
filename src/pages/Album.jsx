import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
    };
  }

  componentDidMount() {
    this.reqMusic();
  }

  reqMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    // console.log(response);
    const allMusics = response.filter((arr, i) => i !== 0);
    this.setState({
      artist: response[0],
      musics: allMusics,
    });
  }

  render() {
    const { musics, artist } = this.state;
    // console.log(musics);
    // console.log(artist);
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        <h4 data-testid="artist-name">{ artist.artistName }</h4>
        <p data-testid="album-name">{ artist.collectionName }</p>
        { musics.map((song, index) => (
          <MusicCard { ...song } key={ index } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
