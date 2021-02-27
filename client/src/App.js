import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import SubmitATM from './SubmitATM';
import Footer from './Footer';

const App = () => {

  return (
    <div className="container">
        <Router>
            <Switch>
                <Route exact path="/submit" component={SubmitATM}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </Router>
      <Footer />
    </div>
  )
}

export default App