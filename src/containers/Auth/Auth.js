import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errormessagge: 'Please enter a valid Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                errormessagge: 'Password must be minimum 6 characters'
            }
        },
        isSignup: true
        //formIsValid: false
    }

    componentDidMount() {
        if ( !this.props.buildingEatery && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedSigninForm = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            } )
        } )
        this.setState({ controls: updatedSigninForm })
        // let formIsValid = true;
        // for (let controlName in updatedSigninForm) {
        //     formIsValid = updatedSigninForm[controlName].valid && formIsValid;
        // }
        // this.setState({controls: updatedSigninForm, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                errormessage={formElement.config.errormessagge}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        )); 

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{ this.props.error.message }</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                { authRedirect }
                { errorMessage }
                <form onSubmit={this.submitHandler}>
                    {form}
                    {/* <Button btnType="Success" disabled={!this.state.formIsValid}>SIGNIN</Button> */}
                    <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">{this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} INSTEAD</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading, 
        email: state.auth.email,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingEatery: state.eateryBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticate: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup)), 
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));