import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import { config } from './pageConfig';

const MainComponent = React.createClass({
  propTypes: {
    children: PropTypes.element,
    params: PropTypes.object
  },
  render: function () {
    return (
      <div>
        <h1>Maps {this.props.params.type}</h1>
        <h4>
          {config.map(item => <span key={item.type}><Link to={item.link}>{item.type}</Link> | </span>)}
        </h4>
        {this.props.children}
      </div>
    );
  }
});

export default MainComponent;
