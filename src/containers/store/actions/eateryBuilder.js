import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

//used for asynchronous data manipulation with server
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                //console.log(response.data);
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                //console.log(error);
                dispatch(fetchIngredientsFailed());
            })
    }
}