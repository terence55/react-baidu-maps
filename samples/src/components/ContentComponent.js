import React from 'react';
import PropTypes from 'prop-types';
import { pageMap } from './pageConfig';

const ContentComponent = React.createClass({
  propTypes: {
    params: PropTypes.object
  },
  render: function () {
    if (pageMap[this.props.params.type] !== undefined) {
      return pageMap[this.props.params.type];
    }
    return (<div>Not Match</div>);
  }
});

export default ContentComponent;
