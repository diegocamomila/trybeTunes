import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGTH = 2;
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputNameBand: '',
      isDisabled: true,
      loading: false,
      artist: '',
      dataBand: [],
      errorAPI: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadteInput = this.validadteInput.bind(this);
  }

  handleClick = async () => {
    const { inputNameBand } = this.state;
    const dataAPI = await searchAlbumsAPI(inputNameBand);
    const falhaAPI = dataAPI.length === 0;
    console.log(dataAPI);

    this.setState({
      artist: inputNameBand,
      inputNameBand: '',
      dataBand: dataAPI,
      errorAPI: falhaAPI,
    });
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    }, () => this.validadteInput());
    // quandoatualiza o estado é asincrono mas nao é uma promise, por isso tem de chamar
    // a funçao de validaçao como calback junto coom o setState
  }

  validadteInput() {
    const { inputNameBand } = this.state; // como vai fazer validaçoes precisa do valor do estado atualizado
    const validadteNameInput = inputNameBand.length < MIN_LENGTH;

    this.setState({
      isDisabled: validadteNameInput,
    });
  }

  render() {
    const {
      inputNameBand,
      isDisabled,
      loading,
      artist,
      dataBand,
      errorAPI,
    } = this.state;

    if (loading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="inputNameBand">
            Nome da banda ou artista:
            <input
              data-testid="search-artist-input"
              type="text"
              name="inputNameBand"
              id="inputNameBand"
              value={ inputNameBand }
              onChange={ ({ target }) => this.handleChange(target) } // desetruturado o target de dentro do event, 14/01/22 mentoria de revisão Moises santana
            />
          </label>

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>

        <div>
          {(errorAPI === false)
            ? <h4>{`Resultado de álbuns de: ${artist}`}</h4>
            : <span>Nenhum álbum foi encontrado</span>}
        </div>
        <section>
          {dataBand
            .map(({ artistName, collectionName, artworkUrl100, collectionId }) => (

              <Link
                key={ collectionId }
                to={ `album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p>{ collectionName }</p>
                <p>{ artistName }</p>
              </Link>

            ))}
        </section>
      </div>
    );
  }
}

export default Search;
