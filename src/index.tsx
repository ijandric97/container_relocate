import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

import 'normalize.css';

import firebase from 'firebase';
import firebaseConfig from './firebase.config';

import App from './App';

firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
