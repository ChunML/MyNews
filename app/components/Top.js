import React from 'react';
import PropTypes from 'prop-types';
import { fetchNews } from '../utils/api';
import { FaUser, FaHandPointRight } from 'react-icons/fa';

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

CountryNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateCountry: PropTypes.func.isRequired
};

function CategoryNav({ selected, onUpdateCategory }) {
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  return (
    <ul className='flex-center'>
      { categories.map(category => (
        <li key={ category }>
          <button
            className='dark-btn'
            disabled={ category == selected }
            onClick={ () => onUpdateCategory(category) }
          >
            { category }
          </button>
        </li>
      )) }
    </ul>
  )
}

CategoryNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateCategory: PropTypes.func.isRequired
};

function NewsDisplay({ newsList }) {
  console.log(newsList)
  return (
    <ul className='grid space-around'>
      {newsList.map((news, index) => {
        const { author, title, description, url, urlToImage, publishedAt, source } = news;
        const date = new Date(publishedAt).toLocaleDateString('en-US', {
          timeZone: 'Asia/Tokyo',
          weekDay: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short'
        });
        return (
          <li key={ url } className='bg-light news'>
            <h3>{ title }</h3>
            <div>
              <span>Published by </span>
              <span><FaUser color='rgb(53, 148, 242)'/><strong>{ !author ? 'Anonymous' : author }</strong></span>
              <span> from </span>
              <a href={ source.name }>{ source.name }</a>
              <span className='meta-date'> at { date }</span>
            </div>
            <p>{ description }</p>
            <p><a href={ url } target="_blank">Read more at </a><FaHandPointRight size={20} /></p>
          </li>
        );
      })}
    </ul>
  )
}

NewsDisplay.propTypes = {
  newsList: PropTypes.array.isRequired,
};

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'Japan',
      selectedCategory: 'business',
      newsList: null
    };

    this.updateCountry = this.updateCountry.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  componentDidMount() {
    this.updateCountry(this.state.selectedCountry);
  }

  updateCountry(selectedCountry) {
    this.setState({
      selectedCountry,
      newsList: null
    });

    fetchNews(selectedCountry, this.state.selectedCategory)
      .then(newsList => {
        this.setState({ newsList });
      });
  }

  updateCategory(selectedCategory) {
    this.setState({
      selectedCategory,
      newsList: null
    });

    fetchNews(this.state.selectedCountry, selectedCategory)
      .then(newsList => {
        this.setState({ newsList });
      });
  }

  render() {
    const { selectedCountry, selectedCategory, newsList } = this.state;
    return (
      <React.Fragment>
        <CountryNav
          onUpdateCountry={ this.updateCountry }
          selected={ selectedCountry }
        />

        <CategoryNav
          selected={ selectedCategory }
          onUpdateCategory={ this.updateCategory }
        />

        { newsList && <NewsDisplay newsList={ newsList } />}
      </React.Fragment>
    );
  }
}