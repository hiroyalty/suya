import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjH6sGydV2vyTA1QKoZV27oKlYST1yhrw'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjH6sGydV2vyTA1QKoZV27oKlYST1yhrw'
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res.data)
            dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(error => {
            console.log(error.response.data.error);
            dispatch(authFail(error.response.data.error))
        })
    }
}