import React from 'react';
import { Link } from 'react-router-dom';
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

  render() {
    const { loading, inputName } = this.state;

    if (loading) {
      return <Carregando />;
    }

    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">{inputName}</h4>

        <Link data-testid="link-to-search" to="/search" />
        <Link data-testid="link-to-favorites" to="/favorites" />
        <Link data-testid="link-to-profile" to="/profile" />

      </header>
    );
  }
}

export default Header;
