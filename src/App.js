import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import EateryBuilder from './containers/EateryBuilder/EateryBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <EateryBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
