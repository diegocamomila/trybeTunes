import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, playMusic } = this.props;
    return (
      <div>
        {/* exibir o nome da música (propriedade trackName no objeto recebido pela API pasado por props
          foi destruturado no album) */}
        <h5>{ musicName }</h5>
        {/* player para tocar o preview da música. */}
        <audio data-testid="audio-component" src={ playMusic } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  playMusic: PropTypes.string.isRequired,
}.isRequired;

export default MusicCard;
