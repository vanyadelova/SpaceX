import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components
import Header from './components/Header';
import Menu from './components/Menu';
import Error from './components/Error';
import Footer from './components/UI/Footer';

//Pages
import Details from './components/Details';
import Launches from './components/Launches';



  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
  });

function App() {
  return (
    <ApolloProvider client={client}>
    <Fragment>
        <Router>

            <Header />

            <div className="container">
              <Switch>
                  <Route exact path="/" component={Menu} />
                  <Route path="/details/:project/:id" component={Details} />
                  <Route exact path="/launches" component={Launches}/>
                  <Route path="*" component={Error} />
              </Switch>
            </div>

            <Footer/>
        </Router>
    </Fragment>
    </ApolloProvider>
  );
}

export default App;