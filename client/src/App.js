import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'

import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import PrivateRoute from './components/routing/PrivateRoute'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div>
              <Navbar />
              <div className="container">
                <Alerts/>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} ></PrivateRoute>
                    <Route exact path="/about" component={About} ></Route>
                    <Route exact path="/register" component={Register} ></Route>
                    <Route exact path="/login" component={Login} ></Route>
                  </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
