import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AlertState = (props) => {


    const initialState = [];



    // state gives us access to state, dispatch lets us dispatch objects to reducer
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    //set alert
    const setAlert = (message, type) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: {message, type, id}
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, 3500)
    }



    return (
        <AlertContext.Provider
            value={{
                alerts: state, // state is the initial state array,
                setAlert

            }}
        >

            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
