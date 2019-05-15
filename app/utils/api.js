const API_KEY = 'e64a9aa1bd96464dba5d7cad070b51f5';
const countryKey = {
  'Japan': 'jp',
  'Taiwan': 'tw',
  'US': 'us',
  'China': 'cn'
}

export function fetchNews(country, category) {
  const URL = `https://newsapi.org/v2/top-headlines?country=${countryKey[country]}&category=${category}&apiKey=${API_KEY}`;

  return fetch(URL)
    .then(res => res.json())
    .then(data => {
      if (!data.articles) {
        throw new Error(data.message);
      }

      return data.articles;
    });
}