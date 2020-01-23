import React, { Component } from "react";
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            //console.log(param);
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.state = {
            ingredients: ingredients,
            price: price
        }
    }
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //console.log(param);
    //         if (param[0] === 'price') {
    //             price = +param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, price: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // we pass props to render so we can redirect using history when we done with order on contactData
                    // we could use withRouter pakage to wrap this component to achieve same results.  
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;