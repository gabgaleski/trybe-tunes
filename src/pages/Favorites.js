import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
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
    await removeSong(music);
    this.getSongAPI();
  };

  render() {
    const { loading, saveSong } = this.state;
    return (
      <div className="search-container" data-testid="page-favorites">
        <Header />
        <div>
          <div className="header-favorite">
            <h1>Musicas Favorites</h1>
          </div>
          <div className="music-card-container">
            {loading ? <Loading />
              : saveSong.map((music) => (
                <div className="music" key={ music.trackId }>
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
                      checked={
                        saveSong.some(({ trackId }) => trackId === music.trackId)
                      }
                      onChange={ () => this.saveMusic(music) }
                    />
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
