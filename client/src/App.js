import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import './App.css';
import Contacts, { contactsListQuery } from './Contacts'
import AddContact from './AddContact'

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const client = new ApolloClient({
  link,
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h2>CRM</h2>
        </header>
        <AddContact/>
        <Contacts />
      </div>
    </ApolloProvider>
  );
}

export default App;
