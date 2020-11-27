import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Point} from '../utils/MapPropTypes';
import {toBMapPoint} from '../utils/typeTransform';
import BaseOverlay from './BaseOverlay';

/**
 * Polygon
 * @author terencewu
 */

const controlledPropTypes = {
  path: PropTypes.arrayOf(PropTypes.shape(Point)),
  strokeColor: PropTypes.string,
  fillColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  fillOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  strokeStyle: PropTypes.oneOf(['solid', 'dashed']),
  enableEditing: PropTypes.bool,
  enableMassClear: PropTypes.bool
};

const controlledPropUpdater = {
  path(obj, arg) { obj.setPath(arg.map((point) => toBMapPoint(point))); },
  strokeColor(obj, arg) { obj.setStrokeColor(arg); },
  fillColor(obj, arg) { obj.setFillColor(arg); },
  strokeOpacity(obj, arg) { obj.setStrokeOpacity(arg); },
  fillOpacity(obj, arg) { obj.setFillOpacity(arg); },
  strokeWeight(obj, arg) { obj.setStrokeWeight(arg); },
  strokeStyle(obj, arg) { obj.setStrokeStyle(arg); },
  enableEditing(obj, arg) { if (arg) obj.enableEditing(); else obj.disableEditing(); },
  enableMassClear(obj, arg) { if (arg) obj.enableMassClear(); else obj.disableMassClear(); }
};

const publicMethodMap = [
  'getPath',
  'getStrokeColor',
  'getFillColor',
  'getStrokeOpacity',
  'getFillOpacity',
  'getStrokeWeight',
  'getStrokeStyle',
  'getBounds',
  'setPositionAt',
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
  'lineupdate'
];

class Polygon extends BaseOverlay {
  static propTypes = {
    [MAP]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  componentDidMount() {
    const {path} = this.props; // eslint-disable-line react/prop-types
    this.instance = new BMap.Polygon(path.map((point) => toBMapPoint(point))); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.instance);
  }
}

export default wrapClass(Polygon, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
