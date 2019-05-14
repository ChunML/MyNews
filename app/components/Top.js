import React from 'react';
import { fetchNews } from '../utils/api';

function CountryNav({ selected, onUpdateCountry }) {
  const countries = ['Japan', 'US', 'Taiwan', 'China'];

  console.log(selected)
  return (
    <ul className='flex-center'>
      { countries.map(country => (
        <li key={ country }>
          <button
            className='btn-clear nav-link'
            style={ country === selected ? { color: 'rgb(187, 46, 31)' } : null }
            onClick={ () => onUpdateCountry(country) }
          >
            { country }
          </button>
        </li>
      )) }
    </ul>
  );
}

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'Japan',
      news: null
    };

    this.updateCountry = this.updateCountry.bind(this);
  }

  componentDidMount() {
    this.updateCountry(this.state.selectedCountry);
  }

  updateCountry(selectedCountry) {
    this.setState({
      selectedCountry,
      news: null
    });

    fetchNews(selectedCountry)
      .then(news => {
        this.setState({ news });
      });
  }

  render() {
    return (
      <React.Fragment>
        <CountryNav
          onUpdateCountry={ this.updateCountry }
          selected={ this.state.selectedCountry }
        />

        { this.state.news && <pre>{ JSON.stringify(this.state.news, null, 2) }</pre>}
      </React.Fragment>
    );
  }
}