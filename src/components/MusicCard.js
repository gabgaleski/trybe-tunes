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
    if (loading) return <Loading />;
    return (
      <div className="music-card-container">
        {arrayMusic.map((music) => (
          <div key={ music.trackId }>
            <div className="music">
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ music.trackId }
              >
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id={ music.trackId }
                  name={ music.trackId }
                  type="checkbox"
                  checked={ saveSong.some(({ trackId }) => trackId === music.trackId) }
                  onChange={ () => this.saveMusic(music) }
                />
              </label>
            </div>
            <hr />
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
