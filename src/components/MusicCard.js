import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: true,
    saveSong: [],
  };

  componentDidMount() {
    this.getSongAPI();
  }

  getSongAPI = async () => {
    const songs = await getFavoriteSongs();
    this.setState({
      saveSong: songs,
      loading: false,
    });
  };

  saveMusic = async (music) => {
    this.setState({
      loading: true,
    });
    const { saveSong } = this.state;
    if (saveSong.some(({ trackId }) => trackId === music.trackId)) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.getSongAPI();
  };

  render() {
    const { arrayMusic } = this.props;
    const { loading, saveSong } = this.state;
    console.log(loading);
    return (
      <div>
        {loading ? <Loading />
          : arrayMusic.map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ music.trackId }
                data-testid={ `checkbox-music-${music.trackId}` }
              >
                Favorita
                <input
                  id={ music.trackId }
                  name={ music.trackId }
                  type="checkbox"
                  checked={ saveSong.some(({ trackId }) => trackId === music.trackId) }
                  onChange={ () => this.saveMusic(music) }
                />
              </label>
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  arrayMusic: PropTypes.arrayOf(shape()).isRequired,
};

export default MusicCard;
