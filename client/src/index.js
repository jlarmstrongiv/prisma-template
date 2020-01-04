import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_SERVER_ENDPOINT || 'http://localhost:4000',
});

const root = (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(root, document.getElementById('root'));
