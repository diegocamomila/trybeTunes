import React from 'react';

class MusicCard extends React.Component {
  render() {
    return (
      <div>
        {/* exibir o nome da música (propriedade trackName no objeto recebido pela API) */}
        <h5>{ trackName }</h5>
        {/* player para tocar o preview da música (propriedade previewUrl no objeto recebido pela API). */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              checked={ favorite }
              onChange={ this.handleCheck }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </audio>
      </div>
    );
  }
}

export default MusicCard;
