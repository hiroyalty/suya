import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Buttton from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        //default action on a form is to send the request and reload the page
        // thus the console log will be cleared and not seen, to prevent this we have to prevent default by calling
        // preventDefault function on the submit event Handler.
        event.preventDefault(); 
        
        console.log(this.props.ingredients);
        // const initialIngredients = {
        //     salad : 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // };
    
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
                if (response.status >= 200 && response.status <= 300) {
                    //this.setState({ingredients : initialIngredients })
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                //console.log(error);
                this.setState({ loading: false });
            })
    }

    render() {
        let form = ( 
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Buttton btnType="Success" clicked={this.orderHandler}>ORDER</Buttton>
            </form>
            );
        if (this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;