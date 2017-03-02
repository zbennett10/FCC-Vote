import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import UserProfile from './components/UserProfile';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if token is available - user is signed
if(token && location.pathname.includes('user')) {
  const userID = location.pathname.substring(6);
  store.dispatch({ type: AUTH_USER, payload: userID })
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
      <Route path="/user/:id" component={UserProfile}></Route>
    </Router>
  </Provider>,
  document.getElementById('root'), // eslint-disable-line no-undef
);

