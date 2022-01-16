import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      inputName: '',
    };
  }

  componentDidMount() {
    this.nomeAPI();
  }

  nomeAPI = () => {
    this.setState({
      loading: true,
    });
    getUser().then(({ name }) => {
      this.setState({
        loading: false,
        inputName: name,
      });
    });
  }

  // handleClick = () => {
  //   const { inputName } = this.state;
  //   this.setState({
  //     loading: true,
  //   });
  //   createUser({ name: inputName }).then(() => {
  //     this.setState({
  //       loading: false,
  //       redirect: true,
  //     });
  //   });
  // }

  render() {
    const { loading, inputName } = this.state;

    if (loading) {
      return <Carregando />;
    }

    // if (loading) {
    //   return <Carregando />;
    // }
    // if (redirect) {
    //   return <Redirect to="/search" />;
    // }

    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">{inputName}</h4>
      </header>
    );
  }
}

export default Header;
