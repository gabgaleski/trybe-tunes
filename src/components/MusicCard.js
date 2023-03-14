import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    saveSong: [],
  };

  async componentDidMount() {
    const songs = await getFavoriteSongs();
    if (songs) {
      this.setState({
        saveSong: songs,
      });
    }
  }

  saveMusic = async (music) => {
    this.setState((previus) => ({
      loading: true,
      saveSong: [...previus.saveSong, music],
    }));
    const { saveSong } = this.state;
    await addSong(saveSong);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { arrayMusic } = this.props;
    const { loading, saveSong } = this.state;
    return (
      <div>
        {loading && <span>Carregando...</span>}
        {arrayMusic.map((music) => (
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
                name="inputCheck"
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
