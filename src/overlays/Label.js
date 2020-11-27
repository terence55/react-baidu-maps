import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Point, Size} from '../utils/MapPropTypes';
import {toBMapPoint, toBMapSize} from '../utils/typeTransform';
import BaseOverlay from './BaseOverlay';

/**
 * Label
 * @author terencewu
 */

const controlledPropTypes = {
  position: PropTypes.shape(Point),
  style: PropTypes.object,
  content: PropTypes.string,
  offset: PropTypes.shape(Size),
  title: PropTypes.string,
  enableMassClear: PropTypes.bool,
  zIndex: PropTypes.number
};

const controlledPropUpdater = {
  position(obj, arg) { obj.setPosition(toBMapPoint(arg)); },
  style(obj, arg) { obj.setStyle(arg); },
  content(obj, arg) { obj.setContent(arg); },
  offset(obj, arg) { obj.setOffset(toBMapSize(arg)); },
  title(obj, arg) { obj.setTitle(arg); },
  enableMassClear(obj, arg) { if (arg) obj.enableMassClear(); else obj.disableMassClear(); },
  zIndex(obj, arg) { obj.setZIndex(arg); }
};

const publicMethodMap = [
  'getPosition',
  'getOffset',
  'getTitle',
  'getMap',
  'show',
  'hide'
];

const eventMap = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseout',
  'mouseover',
  'remove',
  'rightclick'
];

class Label extends BaseOverlay {
  static propTypes = {
    [MAP]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  componentDidMount() {
    const {position} = this.props; // eslint-disable-line react/prop-types
    this.instance = new BMap.Label(toBMapPoint(position)); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.instance);
  }
}

export default wrapClass(Label, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
