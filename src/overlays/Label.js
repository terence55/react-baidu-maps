import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';
import { Point, Size } from '../utils/MapPropTypes';
import { toBMapPoint, toBMapSize } from '../utils/typeTransform';

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

class Label extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.label;
  }

  componentDidMount() {
    const { position } = this.props; // eslint-disable-line react/prop-types
    this.label = new BMap.Label(toBMapPoint(position)); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.label);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(Label, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
