import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Register = () => {

    const alertContext = useContext(AlertContext);

    // deconstruct setAlert from alertContext below
    const {setAlert} = alertContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',

    })

    const { name, email, password, password2 } = user

    const onChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (name === '' || email === "" || password === "") {
            setAlert("Please enter all fields", "danger")

        } else if (password !== password2) {
            setAlert("Passwords do not match", "danger")
        } else {
            console.log("submited regiter")
        }

    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary" >Register</span>
            </h1>

            <form onSubmit={onSubmit} >

                <div className="form-group">
                    <label htmlFor='name' >Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor='email' >Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password" >Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} required minLength="6" ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password2" >Confirm Pass</label>
                    <input type="text" name="password2" value={password2} onChange={onChange} required ></input>
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" ></input>
            </form>

        </div>
    )
}

export default Register;
