import React from 'react';
import { fetchNews } from '../utils/api';

function CountryNav({ selected, onUpdateCountry }) {
  const countries = ['Japan', 'US', 'Taiwan', 'China'];

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

function NewsDisplay({ newsList }) {
  console.log(newsList)
  return (
    <ul className='grid space-around'>
      {newsList.map((news, index) => {
        const { author, title, description, url, urlToImage, publishedAt } = news;
        return (
          <li key={ url } className='bg-light news'>
            <img
              src={ urlToImage }
              className='avatar'
            />
            <h3>{ author }</h3>
            <h3>{ title }</h3>
            <p>{ description }</p>
            <a href={ url }>Read more at</a>
            <p>{ publishedAt }</p>
          </li>
        );
      })}
    </ul>
  )
}

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'Japan',
      newsList: null
    };

    this.updateCountry = this.updateCountry.bind(this);
  }

  componentDidMount() {
    this.updateCountry(this.state.selectedCountry);
  }

  updateCountry(selectedCountry) {
    this.setState({
      selectedCountry,
      newsList: null
    });

    fetchNews(selectedCountry)
      .then(newsList => {
        this.setState({ newsList });
      });
  }

  render() {
    const { selectedCountry, newsList } = this.state;
    return (
      <React.Fragment>
        <CountryNav
          onUpdateCountry={ this.updateCountry }
          selected={ selectedCountry }
        />

        { newsList && <NewsDisplay newsList={ newsList } />}
      </React.Fragment>
    );
  }
}