import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    id: undefined,
    arrayMusic: [],
    collectionName: '',
    artistName: '',
  };

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const get = await getMusics(id);
    this.setState({
      id,
      arrayMusic: get.filter((_music, index) => index > 0),
      collectionName: get[0].collectionName,
      artistName: get[0].artistName,
      albumImg: get[0].artworkUrl100,
    });
  };

  render() {
    const { id, arrayMusic, collectionName, artistName, albumImg } = this.state;
    return (
      <div className="search-container" data-testid="page-album">
        <Header />
        <div>
          <div className="header-album">
            <img src={ albumImg } alt="Imagem do album" />
            <div className="infos-album">
              <h3 id={ id } data-testid="album-name">{collectionName}</h3>
              <p data-testid="artist-name">{artistName}</p>
            </div>
          </div>
          <MusicCard arrayMusic={ arrayMusic } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired }).isRequired,
};

export default Album;
