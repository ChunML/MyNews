import React from 'react';
import ReactDOM from 'react-dom';
import Top from './components/Top';
require('./index.css');

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Top />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)