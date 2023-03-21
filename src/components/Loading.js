import React from 'react';
import spin from '../img/spin.png';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <img
          className="animate__animated animate__rotateIn animate__infinite"
          src={ spin }
          alt="Imagem de carregamento"
        />
        <p className="loading">Carregando...</p>
      </div>
    );
  }
}

export default Loading;
