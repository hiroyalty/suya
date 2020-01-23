import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders : [],
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key});
            }
            //console.log(fetchedOrders);
            this.setState({ orders: fetchedOrders, loading: false });
        })
        .catch(error => {
            this.setState({loading: false, error: true })
            //console.log(error);
        })
    }

    render () {
        let orders = null;
        if(this.state.orders.length > 0) {
            orders = Object.values(this.state.orders).map((order) => {
                console.log(order);
                return <Order key={order.id} ingredients={order.ingredients} price={+order.price} customer={order.customer} />
            })
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);