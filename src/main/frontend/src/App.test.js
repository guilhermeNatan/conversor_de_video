import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <Route  path="/teste" render = { <App /> } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
