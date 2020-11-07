import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'


const AuthState = (props) => {


    const initialState = {
        token: localStorage.getItem('token'), // access our browsers local storage and grabs token
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null

    };



    // state gives us access to state, dispatch lets us dispatch objects to reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // load user
    const loadUser = () => {

    }

    // Register User takes in form data which is the data needed to register user
    const registerUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data // resData will be the token that is coming from the back-end.
            })


        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    // Login User

    const logIn = () => {

    }

    //Logout

    const logOut = () => {

    }

    //Clear errors

    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }




    return (
        <AuthContext.Provider
            value={{
                token: state.token, // state is coming from variable state where we initialize useReducer
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                registerUser,
                logIn,
                logOut,
                clearErrors,
                loadUser

            }}
        >

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
