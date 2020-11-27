import React from 'react';
import PropTypes from 'prop-types';
import {MAP} from '../utils/constants';
import {Size} from '../utils/MapPropTypes';
import {getMapTypeControlType, getMapType, getControlAnchor, toBMapSize} from '../utils/typeTransform';
import BaseControl from './BaseControl';

/**
 * MapTypeControl
 * @author terencewu
 */

class MapTypeControl extends BaseControl {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    type: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    mapTypes: PropTypes.arrayOf(PropTypes.oneOf(['normal', 'perspective', 'satellite', 'hybrid'])),
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size)
  };

  componentDidMount() {
    const {type, mapTypes, anchor, offset} = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (type) {
      option.type = getMapTypeControlType(type);
    }
    if (mapTypes && mapTypes.length > 0) {
      option.mapTypes = mapTypes.map((mapType) => getMapType(mapType));
    }
    if (anchor) {
      option.anchor = getControlAnchor(anchor);
    }
    if (offset) {
      option.offset = toBMapSize(offset);
    }
    this.instance = new BMap.MapTypeControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.instance);
  }
}

export default MapTypeControl;
