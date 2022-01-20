import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
    this.checkChange = this.checkChange.bind(this);
  }

  checkChange({ target }) {
    const { albumData } = this.props;
    const favoriteMusic = albumData.find((music) => (music.trackId === target.id));

    this.setState({
      loading: true,
    }, async () => {
      await addSong(favoriteMusic);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { musicName, playMusic, trackId } = this.props;
    const { loading } = this.state;

    return (
      <div>
        { loading && <Carregando /> }
        {/* exibir o nome da música (propriedade trackName no objeto recebido pela API pasado por props
          foi destruturado no album) */}
        <h5>{ musicName }</h5>
        {/* player para tocar o preview da música. */}
        <audio data-testid="audio-component" src={ playMusic } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="checkFavoriteMusic">
          Favorita
          <input
            type="checkbox"
            name="checkFavoriteMusic"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.checkChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  playMusic: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
}.isRequired;

export default MusicCard;
