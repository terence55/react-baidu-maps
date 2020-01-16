import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import {Bounds} from '../utils/MapPropTypes';

/**
 * Rectangle
 * @author terencewu
 */

const controlledPropTypes = {
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

class Rectangle extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    bounds: PropTypes.shape(Bounds)
  };

  getInstanceFromComponent(component) {
    return component.rectangle;
  }

  componentDidMount() {
    const {bounds} = this.props;
    const points = [
      new BMap.Point(bounds.sw.lng, bounds.sw.lat), // eslint-disable-line no-undef
      new BMap.Point(bounds.ne.lng, bounds.sw.lat), // eslint-disable-line no-undef
      new BMap.Point(bounds.ne.lng, bounds.ne.lat), // eslint-disable-line no-undef
      new BMap.Point(bounds.sw.lng, bounds.ne.lat) // eslint-disable-line no-undef
    ];
    this.rectangle = new BMap.Polygon(points); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.rectangle);
  }

  render() {
    const {children} = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(Rectangle, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
