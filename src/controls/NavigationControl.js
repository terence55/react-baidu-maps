import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Size} from '../utils/MapPropTypes';
import {getNavigationControlType, getControlAnchor, toBMapSize} from '../utils/typeTransform';
import BaseControl from './BaseControl';

/**
 * NavigationControl
 * @author terencewu
 */

const controlledPropTypes = {
  type: PropTypes.oneOf(['large', 'small', 'pan', 'zoom'])
};

const controlledPropUpdater = {
  type(obj, arg) { obj.setType(getNavigationControlType(arg)); }
};

const publicMethodMap = [
  'getType'
];

class NavigationControl extends BaseControl {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size),
    showZoomInfo: PropTypes.bool,
    enableGeolocation: PropTypes.bool
  };

  componentDidMount() {
    const {type, anchor, offset, showZoomInfo, enableGeolocation} = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (type) {
      option.type = getNavigationControlType(type);
    }
    if (anchor) {
      option.anchor = getControlAnchor(anchor);
    }
    if (offset) {
      option.offset = toBMapSize(offset);
    }
    if (showZoomInfo !== undefined) {
      option.showZoomInfo = showZoomInfo;
    }
    if (enableGeolocation !== undefined) {
      option.enableGeolocation = enableGeolocation;
    }
    this.instance = new BMap.NavigationControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.instance);
  }
}

export default wrapClass(NavigationControl, controlledPropTypes, controlledPropUpdater, publicMethodMap);
