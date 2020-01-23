import React from 'react';
//allow us pass the component props(here: ingredients) to emcompassing components and can
//be reached as props.
//import { withRouter } from 'react-router-dom'; 

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    //console.log(props)
    let transfixedIngredients = Object.keys(props.ingredients).map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((accumulator, curVal) => {
            return accumulator.concat(curVal)
        }, []);
    //console.log(transfixedIngredients);
    if (transfixedIngredients.length === 0) {
        transfixedIngredients = <p>Please start adding Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfixedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

//export default withRouter(burger);
export default burger;