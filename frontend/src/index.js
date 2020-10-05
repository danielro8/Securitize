import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <header className="header">
      <h1>Challenge para Securitize</h1>
    </header>
    <div className="container main">
      <App />
    </div>
    <footer>
      <p>Coyright &copy;2020 Daniel Edmundo Rodríguez López Serra</p>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
