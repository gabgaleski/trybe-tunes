import React from 'react';
import PropTypes, { shape } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { arrayMusic } = this.props;
    return (
      <div>
        {arrayMusic.map((music) => (
          <div key={ music.trackId }>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
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
