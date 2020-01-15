import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import MainComponent from './components/MainComponent';
import ContentComponent from './components/ContentComponent';

class Index extends React.Component {
  render() {
    return (
      <Router>
        <MainComponent />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/component/simple' />
          </Route>
          <Route path='/component/:type'>
            <ContentComponent />
          </Route>
        </Switch>
      </Router>
    );
  }
}

render(<Index />, document.getElementById('app'));
