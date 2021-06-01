import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Find from './components/Find';
import './App.css';
import {Route,Switch} from 'react-router-dom';

const App = () => {
  return (
    <>
        <Navbar/>
        <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/find">
            <Find/>
        </Route>
        </Switch>
        
    </>
  )
}

export default App;
