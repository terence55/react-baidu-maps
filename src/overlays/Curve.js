import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';
import CurveLine from '../addons/CurveLine';
import { Point } from '../utils/MapPropTypes';
import { toBMapPoint } from '../utils/typeTransform';

/**
 * Curve
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
  path(obj, arg) { obj.setCurvePath(arg.map(point => toBMapPoint(point))); },
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
  'getStrokeOpacity',
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

class Curve extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.curve;
  }

  componentDidMount() {
    const { path } = this.props; // eslint-disable-line react/prop-types
    this.curve = new CurveLine(path.map(point => toBMapPoint(point)));
    this.props[MAP].addOverlay(this.curve);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(Curve, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
