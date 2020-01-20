import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {SubwayIcon} from '../utils/MapPropTypes';
import {toBMapSubwayIcon} from '../utils/typeTransform';

/**
 * SubwayMarker
 * @author terencewu
 */

const controlledPropTypes = {
};

const controlledPropUpdater = {
};

const publicMethodMap = [
  'show',
  'hide'
];

const eventMap = [
];

class SubwayMarker extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    station: PropTypes.string,
    icon: PropTypes.shape(SubwayIcon)
  };

  getInstanceFromComponent(component) {
    return component.marker;
  }

  componentDidMount() {
    const {station, icon} = this.props; // eslint-disable-line react/prop-types
    this.marker = new BMapSub.Marker(station, {icon: toBMapSubwayIcon(icon)}); // eslint-disable-line no-undef
    this.props[MAP].addMarker(this.marker);
    this.forceUpdate();
  }

  render() {
    const {children} = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(SubwayMarker, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
