import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

    // Register User

    // Login User

    //Logout

    //Clear errors




    return (
        <AuthContext.Provider
            value={{
                token: state.token, // state is coming from variable state where we initialize useReducer
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }}
        >

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
