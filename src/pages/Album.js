import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      listMusic: [],
      albumName: '',
      bandName: '',
      albumImage: '',
    };
  }

  componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;

    getMusics(id).then((musics) => {
      const musicsAPI = musics;
      console.log(musics);
      const songs = musicsAPI.filter(({ kind }) => kind === 'song'); // kind === 'song' tirado de dentro do retorno da api cisto no console
      this.setState({
        albumName: musicsAPI[0].collectionName,
        bandName: musicsAPI[0].artistName,
        albumImage: musicsAPI[0].artworkUrl100,
        listMusic: songs,
      });
    });
  }

  render() {
    const { listMusic, albumName, bandName, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <p data-testid="artist-name">{ bandName }</p>
          <p data-testid="album-name">{ albumName }</p>
          <img src={ albumImage } alt={ albumName } />
        </section>
        <section>
          {/* map na lista de musica usando usando componente music card */}
          {listMusic.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }),
}.isRequired;

export default Album;
// exiba o no me da banda

// exiba o nome do album

// exiba todas as musicas, crie componente musicCard

// Ao entrar na página, faça uma requisição utilizando a função getMusics
// do arquivo musicsAPI.js. Lembre-se que essa função espera receber uma
// string com o id do álbum.
