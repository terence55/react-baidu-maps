import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP, MARKER_CLUSTERER } from '../utils/constants';
import { Point, Size, Icon, Label } from '../utils/MapPropTypes';
import { getMarkerAnimation, toBMapPoint, toBMapSize, toBMapIcon, toBMapLabel } from '../utils/typeTransform';

/**
 * Marker
 * @author terencewu
 */

const controlledPropTypes = {
  position: PropTypes.shape(Point),
  icon: PropTypes.shape(Icon),
  offset: PropTypes.shape(Size),
  label: PropTypes.shape(Label),
  title: PropTypes.string,
  onTop: PropTypes.bool,
  enableDragging: PropTypes.bool,
  enableMassClear: PropTypes.bool,
  zIndex: PropTypes.number,
  animation: PropTypes.oneOf(['drop', 'bounce']),
  rotation: PropTypes.number,
  shadow: PropTypes.shape(Icon)
};

const controlledPropUpdater = {
  position(obj, arg) { obj.setPosition(toBMapPoint(arg)); },
  icon(obj, arg) { obj.setIcon(toBMapIcon(arg)); },
  offset(obj, arg) { obj.setOffset(toBMapSize(arg)); },
  label(obj, arg) { obj.setLabel(toBMapLabel(arg)); },
  title(obj, arg) { obj.setTitle(arg); },
  onTop(obj, arg) { obj.setTop(arg); },
  enableDragging(obj, arg) { if (arg) obj.enableDragging(); else obj.disableDragging(); },
  enableMassClear(obj, arg) { if (arg) obj.enableMassClear(); else obj.disableMassClear(); },
  zIndex(obj, arg) { obj.setZIndex(arg); },
  animation(obj, arg) { obj.setAnimation(getMarkerAnimation(arg)); },
  rotation(obj, arg) { obj.setRotation(arg); },
  shadow(obj, arg) { obj.setShadow(toBMapIcon(arg)); }
};

const publicMethodMap = [
  'openInfoWindow',
  'closeInfoWindow',
  'getIcon',
  'getPosition',
  'getOffset',
  'getLabel',
  'getTitle',
  'getMap',
  'addContextMenu',
  'removeContextMenu',
  'setAnimation',
  'getRotation',
  'getShadow',
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
  'infowindowclose',
  'infowindowopen',
  'dragstart',
  'dragging',
  'dragend',
  'rightclick'
];

class Marker extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object,
    [MARKER_CLUSTERER]: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.marker;
  }

  componentDidMount() {
    const { position } = this.props; // eslint-disable-line react/prop-types
    this.marker = new BMap.Marker(toBMapPoint(position)); // eslint-disable-line no-undef
    if (this.props[MARKER_CLUSTERER]) {
      this.props[MARKER_CLUSTERER].addMarker(this.marker);
    } else {
      this.props[MAP].addOverlay(this.marker);
    }
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(Marker, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
