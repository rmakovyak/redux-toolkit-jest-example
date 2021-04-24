import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { buildStore } from 'store';

import './index.css';
import 'nes.css/css/nes.min.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={buildStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
