import React from 'react';
import PropTypes from 'prop-types';
import {MAP} from '../utils/constants';

export default class BaseOverlay extends React.Component {
    static propTypes = {
      [MAP]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
    };

    getInstanceFromComponent(component) {
      return component.instance;
    }

    componentWillUnmount() {
      if (this.instance) {
        this.props[MAP].removeOverlay(this.instance);
        this.instance = null;
      }
    }

    render() {
      const {children} = this.props; // eslint-disable-line react/prop-types
      if (children) {
        return <div>{children}</div>;
      }
      return false;
    }
}
