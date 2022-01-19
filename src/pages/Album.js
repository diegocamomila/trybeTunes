import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      albumList: [],
    };
    this.musicsApi = this.musicsApi.bind(this);
  }

  componentDidMount() {
    this.musicsApi();
  }

  async musicsApi() {
    const { match: { params: { id } } } = this.props;
    const getMusicColections = await getMusics(id);
    this.setState({
      artistName: getMusicColections[0].artistName,
      albumName: getMusicColections[0].collectionName,
      albumList: getMusicColections.slice(1),
    });
  }

  render() {
    const { artistName, albumName, albumList } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        { albumList.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <MusicCard
              musicName={ trackName }
              playMusic={ previewUrl }
            />
          </div>
        ))}
      </div>

    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
}.isRequired;

export default Album;
// exiba o no me da banda

// exiba o nome do album

// exiba todas as musicas, crie componente musicCard

// Ao entrar na página, faça uma requisição utilizando a função getMusics
// do arquivo musicsAPI.js. Lembre-se que essa função espera receber uma
// string com o id do álbum.
