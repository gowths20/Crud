import React from 'react'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import App from './components/Dashboard/App';
const Routing = () => {
  return(
  <Router>
    <Switch>
      <Route path="/" exact component={RegisterForm} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/home" component={App} />
    </Switch>
  </Router>
)}
export default Routing;