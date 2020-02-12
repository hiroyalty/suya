import React, { Component } from "react";
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Eatery/Burger/Burger';
import BuildControls from '../../components/Eatery/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Eatery/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';

class EateryBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        //ingredients: null,
        //totalPrice: 4,
        purchasable: false,
        purchasing: false,
        //loading: false,
        // error: false
    }

    componentDidMount() {
        //console.log(this.props)
        // Two ways to do this. 1. either call a redux action after server call or 
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         //console.log(response.data);
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true })
        //         //console.log(error);
        //     })

        // 2. do the whole async action in redux using thunk, mapDispatchToProps and call d func with props.
        this.props.onInitIngredients();

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
        return sum > 0;
    }

    purchaseHandler = () => {
        //If not authenticated, failed to proceed but ask customer to login.
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/signup')
        }
        
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        //Building query params data to send with url no longer needed now that redux is available. 
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        }; 
        //console.log(this.props.ings)
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
        burger = (
            <Aux>
            <Burger ingredients={this.props.ings} /> 
                <BuildControls
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    //purchasable={this.props.purchasable}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price}
                    isAuthenticated={this.props.isAuthenticated}
                    order={this.purchaseHandler} />
            </Aux>
        );
        orderSummary = (
            <OrderSummary 
            ingredients={this.props.ings}//{this.state.ingredients} 
            price={this.props.price} 
            cancelOrder={this.cancelPurchaseHandler}
            continueOrder={this.continuePurchaseHandler}/> )
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
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

const mapStateToProps = state => {
    return {
        ings: state.eateryBuilder.ingredients,
        price: state.eateryBuilder.totalPrice,
        error: state.eateryBuilder.error,
        isAuthenticated: state.auth.token !== null
        //purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
        // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EateryBuilder, axios));