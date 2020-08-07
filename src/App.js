import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Default from './Components/home';
import SignupForm from './Containers/SignupFrom';
import LoginForm from './Containers/LoginForm';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/" component={Default} exact />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
      </Switch>
    </div>
  );
}

export default App;
