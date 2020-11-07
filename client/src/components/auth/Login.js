import React, { useState } from 'react'

const Login = () => {

    const [user, setUser] = useState({

        email: '',
        password: '',

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
        console.log("Log-in submit")
    }

    return (
        <div className='form-container'>
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>

        <form onSubmit={onSubmit}>

          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input id='email' type='email' name='email' value={email} onChange={onChange} required/>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          </div>

          <input type='submit' value='Login' className='btn btn-primary btn-block'/>
        </form>
      </div>
    );
  };



export default Login;
