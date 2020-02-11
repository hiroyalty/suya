import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import EateryBuilder from './containers/EateryBuilder/EateryBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/signup" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={EateryBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
