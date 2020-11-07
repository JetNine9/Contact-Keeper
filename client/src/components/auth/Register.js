import React, { useState } from 'react'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
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
        console.log("Register submit")
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
                    <input type="text" name="password" value={password} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password2" >Confirm Pass</label>
                    <input type="text" name="password2" value={password2} onChange={onChange}></input>
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" ></input>
            </form>

        </div>
    )
}

export default Register;