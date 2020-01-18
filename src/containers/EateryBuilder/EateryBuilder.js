import React, { Component } from "react";
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Eatery/Burger/Burger';
import BuildControls from '../../components/Eatery/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Eatery/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class EateryBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response.data);
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true })
                //console.log(error);
            })
    }

    updatePurchaseState(ingredients) {
        //const ingredients = { ...this.state.ingredients };
        //const sum = Object.keys(ingredients)
        //     .map(igKey => {
        //         return ingredients[igkey];
        //     })
        //     .reduce((sum, el) => { 
        //         return sum + el;
        //      }, 0); 
        let ingredientValues = Object.values(ingredients);
        let reducer  = (accumulator, currentValue) => accumulator + currentValue;
        
        const sum = ingredientValues.reduce(reducer);
        this.setState({ purchasable : sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const additionalPrice = INGREDIENTS_PRICES[type];
        const updatedPrice = oldPrice + additionalPrice;

        this.setState({
            ingredients: updatedIngredients, 
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = 0;
        if (oldCount <= 0) {
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const additionalPrice = INGREDIENTS_PRICES[type];
        const updatedPrice = oldPrice - additionalPrice;

        this.setState({
            ingredients: updatedIngredients, 
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        //alert('You Continue');
        // this.setState((prevState) => {
        //      return { loading: !prevState.loading}
        // });
        const initialIngredients = {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        };
    
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Omotola Famodun',
                address: {
                    street: '52 Scarborough Ontario',
                    zipCode: '02770',
                    country: 'Canada'
                },
                email: 'omotola.famodun@gmail.com'
            },
            deliveryMethod: 'Uber Eats',

        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
                if (response.status >= 200 && response.status <= 300) {
                    this.setState({ingredients : initialIngredients })
                }
            })
            .catch(error => {
                //console.log(error);
                this.setState({ loading: false, purchasing: false });
            })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
        burger = (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    order={this.purchaseHandler} />
            </Aux>
        );
        orderSummary = (
            <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice} 
            cancelOrder={this.cancelPurchaseHandler}
            continueOrder={this.continuePurchaseHandler}/> )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(EateryBuilder, axios);