import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {SubwaySize} from '../utils/MapPropTypes';
import {getSubwayControlAnchor, toBMapSubwaySize} from '../utils/typeTransform';

/**
 * SubwayZoomControl
 * @author terencewu
 */

const controlledPropTypes = {
};

const controlledPropUpdater = {
};

const publicMethodMap = [
];

const eventMap = [
];

class SubwayZoomControl extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(SubwaySize)
  };

  getInstanceFromComponent(component) {
    return component.subwayZoomControl;
  }

  componentDidMount() {
    const {anchor, offset} = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (anchor !== undefined) {
      option.anchor = getSubwayControlAnchor(anchor);
    }
    if (offset !== undefined) {
      option.offset = toBMapSubwaySize(offset);
    }
    this.subwayZoomControl = new BMapSub.ZoomControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.subwayZoomControl);
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

export default wrapClass(SubwayZoomControl, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
