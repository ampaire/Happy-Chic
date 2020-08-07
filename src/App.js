import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Default from './Components/home';
import SignupForm from './Containers/SignUpForm';
import LoginForm from './Containers/LoginForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Default} exact />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
