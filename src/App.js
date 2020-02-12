import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent'; //for lazy loading

import Layout from './hoc/Layout/Layout';
import EateryBuilder from './containers/EateryBuilder/EateryBuilder';
//import Checkout from './containers/Checkout/Checkout'; we using lazy loading now. good if the component is heavy.
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './containers/store/actions/index'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
     //Incase our token have not expired, we can automatically log user in.
    this.props.onCheckAuthStatus()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={asyncAuth} />
        <Route path="/" exact component={EateryBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={asyncAuth} /> {/*  we added this becos of the redirection present at the auth page  */}
          <Route path="/" exact component={EateryBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthStatus: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default connect(mapStateToProps, mapDispatchToProps)(App)
