import React from 'react';
import PropTaypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        {/* exibir o nome da música (propriedade trackName no objeto recebido pela API) */}
        <h5>{ trackName }</h5>
        {/* player para tocar o preview da música (propriedade previewUrl no objeto recebido pela API). */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTaypes = {
  trackName: PropTaypes.string.isRequired,
  previewUrl: PropTaypes.string.isRequired,
}.isRequirid;

export default MusicCard;
