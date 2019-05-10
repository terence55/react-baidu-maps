import React from 'react';
import PropTypes from 'prop-types';
import { pageMap } from './pageConfig';

class ContentComponent extends React.Component {
  static propTypes = {
    params: PropTypes.object
  };

  render() {
    if (pageMap[this.props.params.type] !== undefined) {
      return pageMap[this.props.params.type];
    }
    return (<div>Not Match</div>);
  }
}

export default ContentComponent;
