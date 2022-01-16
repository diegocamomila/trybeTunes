import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

const MIN_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isDisabled: true,
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadteInput = this.validadteInput.bind(this);
  }

  handleClick = () => {
    const { inputName } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name: inputName }).then(() => {
      this.setState({
        loading: false,
        redirect: true,
      });
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
    const { inputName } = this.state; // como vai fazer validaçoes precisa do valor do estado atualizado
    const validadteNameInput = inputName.length < MIN_LENGTH;

    this.setState({
      isDisabled: validadteNameInput,
    });
  }

  render() {
    const {
      inputName,
      isDisabled,
      loading,
      redirect,
    } = this.state;

    if (loading) {
      return <Carregando />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    // https://qastack.com.br/programming/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="inputName">
            Insira o nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="inputName"
              id="inputName"
              value={ inputName }
              onChange={ ({ target }) => this.handleChange(target) } // desetruturado o target de dentro do event, 14/01/22 mentoria de revisão Moises santana
            />
          </label>

          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>

    );
  }
}

export default Login;
