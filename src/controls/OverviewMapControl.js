import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Size} from '../utils/MapPropTypes';
import {getControlAnchor, toBMapSize} from '../utils/typeTransform';
import BaseControl from './BaseControl';

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

class OverviewMapControl extends BaseControl {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size),
    isOpen: PropTypes.bool
  };

  componentDidMount() {
    const {size, anchor, offset, isOpen} = this.props; // eslint-disable-line react/prop-types
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
    this.instance = new BMap.OverviewMapControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.instance);
  }
}

export default wrapClass(OverviewMapControl, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
