import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      buttonChecked: false,
    };
    this.checkChange = this.checkChange.bind(this);
    // this.checkFavorites = this.checkFavorites.bind(this);
  }

  componentDidMount() {
    this.checkFavorites();
  }

  checkChange = async ({ target }) => {
    const { albumData } = this.props;
    const favoriteMusic = albumData.filter((music) => (music.trackId === target.id));
    const { buttonChecked } = this.state;

    this.setState({
      loading: true,
      buttonChecked: !buttonChecked,
    });
    if (!buttonChecked) {
      await addSong(favoriteMusic);
    } else {
      await removeSong(favoriteMusic);
    }
    this.setState({ loading: false });

    // this.setState({
    //   loading: true,
    //   buttonChecked: true,
    // }, async () => {
    //   await addSong(favoriteMusic);
    //   this.setState({
    //     loading: false,
    //   });
    // });
  }

  checkFavorites() {
    const { listFavorites, trackId } = this.props;
    const favorite = listFavorites.some((music) => music.trackId === trackId);
    if (favorite) {
      this.setState({
        buttonChecked: true,
      });
    }
  }

  render() {
    const { musicName, playMusic, trackId } = this.props;
    const { loading, buttonChecked } = this.state;

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
            checked={ buttonChecked }
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
