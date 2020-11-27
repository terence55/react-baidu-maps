import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Bounds} from '../utils/MapPropTypes';
import {toBMapBounds} from '../utils/typeTransform';
import BaseOverlay from './BaseOverlay';

/**
 * GroundOverlay
 * @author terencewu
 */

const controlledPropTypes = {
  bounds: PropTypes.shape(Bounds),
  opacity: PropTypes.number,
  imageUrl: PropTypes.string,
  displayOnMinLevel: PropTypes.number,
  dispalyOnMaxLevel: PropTypes.number
};

const controlledPropUpdater = {
  bounds(obj, arg) { obj.setBounds(toBMapBounds(arg)); },
  opacity(obj, arg) { obj.setOpacity(arg); },
  imageUrl(obj, arg) { obj.setImageURL(arg); },
  displayOnMinLevel(obj, arg) { obj.setDisplayOnMinLevel(arg); },
  dispalyOnMaxLevel(obj, arg) { obj.setDispalyOnMaxLevel(arg); }
};

const publicMethodMap = [
  'getBounds',
  'getOpacity',
  'getImageURL',
  'getDisplayOnMinLevel',
  'getDispalyOnMaxLevel',
  'show',
  'hide'
];

const eventMap = [
  'click',
  'dblclick'
];

class Ground extends BaseOverlay {
  static propTypes = {
    [MAP]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  componentDidMount() {
    const {bounds} = this.props; // eslint-disable-line react/prop-types
    this.instance = new BMap.GroundOverlay(toBMapBounds(bounds)); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.instance);
  }
}

export default wrapClass(Ground, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
