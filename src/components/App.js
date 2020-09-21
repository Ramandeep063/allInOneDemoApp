import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './home';
import SearchVideos from './searchVideos';
import QuizScreen from './quizScreen';

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route render={(props) => <Component {...props} />} />
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PublicRoute path="/SearchVideos" component={SearchVideos}></PublicRoute>
          <PublicRoute path="/QuizScreen" component={QuizScreen}></PublicRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;