import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders : [],
    //     loading: true,
    //     error: false
    // } 

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    } 

    render () {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                    //console.log(order);
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={+order.price} 
                        customer={order.customer} />
                ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.eateryBuilder.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));