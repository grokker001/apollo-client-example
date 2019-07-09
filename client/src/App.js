import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import Contacts from './components/Contacts'
import ContactSingle from './components/ContactSingle'
import AddContact from './components/AddContact'
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to="/"><h2>CRM</h2></Link>
          </header>
          <AddContact/>
          <Switch>
            <Route exact path="/" component={Contacts}/>
            <Route path="/contact/:contactId" component={ContactSingle}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
