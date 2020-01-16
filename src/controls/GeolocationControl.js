import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Size, Icon} from '../utils/MapPropTypes';
import {getControlAnchor, toBMapSize, toBMapIcon} from '../utils/typeTransform';

/**
 * GeolocationControl
 * @author terencewu
 */

const publicMethodMap = [
  'location',
  'getAddressComponent'
];

const eventMap = [
  'locationSuccess',
  'locationError'
];

class GeolocationControl extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size),
    showAddressBar: PropTypes.bool,
    enableAutoLocation: PropTypes.bool,
    locationIcon: PropTypes.shape(Icon)
  };

  getInstanceFromComponent(component) {
    return component.geolocationControl;
  }

  componentDidMount() {
    const {anchor, offset, showAddressBar, enableAutoLocation, locationIcon} = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (anchor) {
      option.anchor = getControlAnchor(anchor);
    }
    if (offset) {
      option.offset = toBMapSize(offset);
    }
    if (showAddressBar !== undefined) {
      option.showAddressBar = showAddressBar;
    }
    if (enableAutoLocation !== undefined) {
      option.enableAutoLocation = enableAutoLocation;
    }
    if (locationIcon) {
      option.locationIcon = toBMapIcon(locationIcon);
    }
    this.geolocationControl = new BMap.GeolocationControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.geolocationControl);
  }

  render() {
    const {children} = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(GeolocationControl, undefined, undefined, publicMethodMap, eventMap);
