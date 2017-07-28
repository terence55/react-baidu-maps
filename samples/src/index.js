import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import MainComponent from './components/MainComponent';
import ContentComponent from './components/ContentComponent';

const Index = React.createClass({
  render: () => (
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={MainComponent}>
          <Route path="/component/:type" component={ContentComponent} />
        </Route>
      </Router>
    </div>)
});
render(<Index />, document.getElementById('app'));
