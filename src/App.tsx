import React from 'react';
import './App.css';
import RocketLaunches from './components/RocketLaunches';
import RocketDetail from './components/RocketDetail';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={RocketLaunches}/>
        <Route exact path='/launch/:flightNum' component={RocketDetail}/>
        <Route exact path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
