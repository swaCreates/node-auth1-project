import React from 'react';
import './App.scss';
import {Route, Link, Switch} from 'react-router-dom';
import Welcome from '../src/components/Welcome.js';
import Registration from '../src/components/RegisterForm.js';
import LogIn from '../src/components/LogInForm.js';
import FriendsList from '../src/components/FriendsList.js';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Friends Space</h1>
      </header>
      <Switch>
        <Route 
          exact path='/' 
          component={Welcome}
        />
        <Route 
          exact path='/register' 
          component={Registration}
        />
        <Route 
          exact path='/login' 
          component={LogIn}
        />
        <Route 
          exact path='/friends' 
          component={FriendsList}
        />
      </Switch>
    </div>
  );
}

export default App;
