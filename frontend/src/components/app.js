import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';
import LoginForm from './session/login_form';
import SignupForm from './session/signup_form';
import Task from './task/task';
import '../assets/stylesheets/reset.css';


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <ProtectedRoute exact path="/" component={Task} />

      {/* <Route exact path="/admin-login" component={LoginFormContainer} /> */}
    </Switch>
  </div>
);

export default App;