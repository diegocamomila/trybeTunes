import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import { createUser } from '../services/userAPI';
// import { Redirect } from 'react-router-dom';

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadteInput = this.validadteInput.bind(this);
  }

  handleClick = async () => {
    const { inputNameBand } = this.state;
    const dataAPI = await searchAlbumsAPI(inputNameBand);
    this.setState({
      inputNameBand: '',
      artist: inputNameBand,
      dataBand: dataAPI,
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
      // artist,
      // dataBand,
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
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>

      </div>
    );
  }
}

export default Search;
