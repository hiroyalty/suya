import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false //to know if a user already started building the burger before redirection.
    //purchasable: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 } //must be a object
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt)
}

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true})
}


const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)            
            // {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            // }
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)   
            // {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            // };
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
            // {
            //     ...state,
            //     //if we want to arrange the ingredients with salad always on top we can manually
            //     //ingredients: action.ingredients,
            //     ingredients: {
            //         salad: action.ingredients.salad,
            //         bacon: action.ingredients.bacon,
            //         cheese: action.ingredients.cheese,
            //         meat: action.ingredients.meat
            //     },
            //     totalPrice: 4,
            //     error: false
            // };
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state)
            // {
            //     ...state,
            //     error: true
            // }
        // case actionTypes.PURCHASABLE:
        //     let ingredientValues = Object.values(...state.ingredients);
        //     let reducer  = (accumulator, currentValue) => accumulator + currentValue;
            
        //     const sum = ingredientValues.reduce(reducer) > 0;
        //     return {
        //         ...state,
        //         purchasable: sum
        //     }
        default: 
            return state 
    }
}

export default reducer;
