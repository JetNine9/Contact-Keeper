import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = (props) => {

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { logIn, error, clearErrors, isAuthenticated } = authContext;
  const {setAlert} = alertContext;


  const [user, setUser] = useState({

    email: '',
    password: '',

  })


  useEffect(() => {
    // code below redirects if the user is logged in. Redirects to home page
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])



  const {  email, password,  } = user

  const onChange = (event) => {

    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    logIn({
      email: email,
      password: password
    })

  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>

      <form onSubmit={onSubmit}>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input id='email' type='email' name='email' value={email} onChange={onChange} required />
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

        <input type='submit' value='Login' className='btn btn-primary btn-block' />
      </form>
    </div>
  );
};



export default Login;
