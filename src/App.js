import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import EateryBuilder from './containers/EateryBuilder/EateryBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <EateryBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
