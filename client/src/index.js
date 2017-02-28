import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';
import '../semantic/dist/semantic.min.css';
import { Router, Route, browserHistory } from 'react-router';
import UserProfile from './components/UserProfile';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('root'), // eslint-disable-line no-undef
);

