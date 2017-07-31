import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';
import { Size } from '../utils/MapPropTypes';
import { getControlAnchor, toBMapSize } from '../utils/typeTransform';

/**
 * OverviewMapControl
 * @author terencewu
 */

const controlledPropTypes = {
  size: PropTypes.shape(Size)
};

const controlledPropUpdater = {
  size(obj, arg) { obj.setSize(toBMapSize(arg)); }
};

const publicMethodMap = [
  'changeView',
  'getSize'
];

const eventMap = [
  'viewchanged',
  'viewchanging'
];

class OverviewMapControl extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object,
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size),
    isOpen: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.overviewMapControl;
  }

  componentDidMount() {
    const { size, anchor, offset, isOpen } = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (size) {
      option.size = toBMapSize(size);
    }
    if (anchor) {
      option.anchor = getControlAnchor(anchor);
    }
    if (offset) {
      option.offset = toBMapSize(offset);
    }
    if (isOpen !== undefined) {
      option.isOpen = isOpen;
    }
    this.overviewMapControl = new BMap.OverviewMapControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.overviewMapControl);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(OverviewMapControl, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
