import React, { Component } from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Eatery/Burger/Burger';
import BuildControls from '../../components/Eatery/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Eatery/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You Continue');
        //this.setState({purchasing: true});
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} 
                        cancelOrder={this.cancelPurchaseHandler}
                        continueOrder={this.continuePurchaseHandler}/>
                </Modal>
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
    }
}

export default EateryBuilder;