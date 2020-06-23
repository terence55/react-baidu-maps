import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from './utils/wrapClass';
import {MAP} from './utils/constants';
import {getMapType, toBMapBounds, toBMapPoint} from './utils/typeTransform';
import {Point, Bounds} from './utils/MapPropTypes';

/**
 * BaiduMap Component
 * @author terencewu
 */

const controlledPropTypes = {
  center: PropTypes.shape(Point),
  zoom: PropTypes.number,
  enableDragging: PropTypes.bool,
  enableScrollWheelZoom: PropTypes.bool,
  enableDoubleClickZoom: PropTypes.bool,
  enableKeyboard: PropTypes.bool,
  enableInertialDragging: PropTypes.bool,
  enableContinuousZoom: PropTypes.bool,
  enablePinchToZoom: PropTypes.bool,
  enableAutoResize: PropTypes.bool,
  defaultCursor: PropTypes.string,
  draggingCursor: PropTypes.string,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  mapStyle: PropTypes.object,
  mapType: PropTypes.oneOf(['normal', 'perspective', 'satellite', 'hybrid']),
  highResolutionEnabled: PropTypes.bool
};

const controlledPropUpdater = {
  center(obj, arg) { obj.centerAndZoom(toBMapPoint(arg), obj.getZoom()); },
  zoom(obj, arg) { obj.setZoom(arg); },
  enableDragging(obj, arg) { if (arg) obj.enableDragging(); else obj.disableDragging(); },
  enableScrollWheelZoom(obj, arg) { if (arg) obj.enableScrollWheelZoom(); else obj.disableScrollWheelZoom(); },
  enableDoubleClickZoom(obj, arg) { if (arg) obj.enableDoubleClickZoom(); else obj.disableDoubleClickZoom(); },
  enableKeyboard(obj, arg) { if (arg) obj.enableKeyboard(); else obj.disableKeyboard(); },
  enableInertialDragging(obj, arg) { if (arg) obj.enableInertialDragging(); else obj.disableInertialDragging(); },
  enableContinuousZoom(obj, arg) { if (arg) obj.enableContinuousZoom(); else obj.disableContinuousZoom(); },
  enablePinchToZoom(obj, arg) { if (arg) obj.enablePinchToZoom(); else obj.disablePinchToZoom(); },
  enableAutoResize(obj, arg) { if (arg) obj.enableAutoResize(); else obj.disableAutoResize(); },
  defaultCursor(obj, arg) { obj.setDefaultCursor(arg); },
  draggingCursor(obj, arg) { obj.setDraggingCursor(arg); },
  minZoom(obj, arg) { obj.setMinZoom(arg); },
  maxZoom(obj, arg) { obj.setMaxZoom(arg); },
  mapStyle(obj, arg) { if (obj.setMapStyleV2) obj.setMapStyleV2({styleJson: arg}); else obj.setMapStyle({styleJson: arg}); },
  mapType(obj, arg) { obj.setMapType(getMapType(arg)); },
  highResolutionEnabled(obj, arg) { obj.highResolutionEnabled(arg); }
};

const publicMethodMap = [
  'setPanorama',
  'getBounds',
  'getCenter',
  'getDistance',
  'getMapType',
  'getSize',
  'getViewport',
  'getZoom',
  'getPanorama',
  'centerAndZoom',
  'panTo',
  'panBy',
  'reset',
  'setCenter',
  'setCurrentCity',
  'setMapType',
  'setViewport',
  'setZoom',
  'zoomIn',
  'zoomOut',
  'addHotspot',
  'removeHotspot',
  'clearHotspots',
  'addControl',
  'removeControl',
  'getContainer',
  'addContextMenu',
  'removeContextMenu',
  'addOverlay',
  'removeOverlay',
  'clearOverlays',
  'openInfoWindow',
  'closeInfoWindow',
  'pointToOverlayPixel',
  'overlayPixelToPoint',
  'getOverlays',
  'getPanes',
  'addTileLayer',
  'removeTileLayer',
  'getTileLayer',
  'pixelToPoint',
  'pointToPixel'
];

const eventMap = [
  'click',
  'dblclick',
  'rightclick',
  'rightdblclick',
  'maptypechange',
  'mousemove',
  'mouseover',
  'mouseout',
  'movestart',
  'moving',
  'moveend',
  'zoomstart',
  'zoomend',
  'addoverlay',
  'addcontrol',
  'removecontrol',
  'removeoverlay',
  'clearoverlays',
  'dragstart',
  'dragging',
  'dragend',
  'addtilelayer',
  'removetilelayer',
  'load',
  'resize',
  'hotspotclick',
  'hotspotover',
  'hotspotout',
  'tilesloaded',
  'touchstart',
  'touchmove',
  'touchend',
  'longpress'
];

class BaiduMap extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    mapContainer: PropTypes.node.isRequired,
    enableMapClick: PropTypes.bool,
    restrictedBounds: PropTypes.shape(Bounds),
    defaultCenter: PropTypes.shape(Point),
    defaultZoom: PropTypes.number,
    onMapInstantiated: PropTypes.func
  };

  static defaultProps = {
    enableMapClick: true
  };

  constructor(props) {
    super(props);
    this.id = props.id || 'allmap';
    this.onAdjustBounds = this.onAdjustBounds.bind(this);
  }

  getInstanceFromComponent(component) {
    return component.map;
  }

  componentDidMount() {
    if (typeof BMap === 'undefined') { // eslint-disable-line no-undef
      console.error('BMap is not defined. Make sure you\'ve import script.');
      return;
    }
    const {defaultCenter, defaultZoom, onMapInstantiated, enableMapClick} = this.props;
    this.map = new BMap.Map(this.id, {enableMapClick}); // eslint-disable-line no-undef
    const center = defaultCenter || {lng: 116.404, lat: 39.915};
    const zoom = defaultZoom || 11;
    this.map.centerAndZoom(toBMapPoint(center), zoom);
    if (onMapInstantiated) {
      onMapInstantiated(this);
    }
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.handleRestrictedBoundsUpdate();
  }

  render() {
    const {mapContainer, children} = this.props; // eslint-disable-line react/prop-types
    const map = this.map;
    if (!map || !children) {
      return React.cloneElement(mapContainer, {id: this.id});
    }
    return React.cloneElement(mapContainer, {id: this.id}, this.renderChildren(children, map));
  }

  handleRestrictedBoundsUpdate() {
    const {restrictedBounds} = this.props;
    if (restrictedBounds) {
      this.setRestrictedBounds();
    } else {
      this.clearRestrictedBounds();
    }
  }

  setRestrictedBounds() {
    if (this.isRestricted) {
      this.clearRestrictedBounds();
    }
    this.map.addEventListener('moveend', this.onAdjustBounds);
    this.isRestricted = true;
  }

  clearRestrictedBounds() {
    if (!this.isRestricted) {
      return;
    }
    this.map.removeEventListener('moveend', this.onAdjustBounds);
    this.isRestricted = false;
  }

  onAdjustBounds() {
    const map = this.map;
    const bounds = toBMapBounds(this.props.restrictedBounds); // eslint-disable-line react/prop-types
    if (bounds.containsBounds(map.getBounds())) {
      return;
    }
    const curBounds = map.getBounds();
    const curBoundsSW = curBounds.getSouthWest();
    const curBoundsNE = curBounds.getNorthEast();
    const boundsSW = bounds.getSouthWest();
    const boundsNE = bounds.getNorthEast();
    const boundary = {n: 0, e: 0, s: 0, w: 0};
    boundary.n = (curBoundsNE.lat < boundsNE.lat) ? curBoundsNE.lat : boundsNE.lat;
    boundary.e = (curBoundsNE.lng < boundsNE.lng) ? curBoundsNE.lng : boundsNE.lng;
    boundary.s = (curBoundsSW.lat < boundsSW.lat) ? boundsSW.lat : curBoundsSW.lat;
    boundary.w = (curBoundsSW.lng < boundsSW.lng) ? boundsSW.lng : curBoundsSW.lng;
    const center = new BMap.Point(boundary.w + ((boundary.e - boundary.w) / 2), boundary.s + ((boundary.n - boundary.s) / 2)); // eslint-disable-line no-undef
    setTimeout(() => {
      map.panTo(center, {noAnimation: 'no'});
    }, 1);
  }

  renderChildren(children, map) {
    return React.Children.map(children, (child) => {
      if (!child) {
        return null;
      }
      const hasPropTypes = child.type.propTypes && child.type.propTypes[MAP] !== undefined;
      if (child.props.children) {
        return React.cloneElement(child,
          hasPropTypes ? {[MAP]: map} : {},
          this.renderChildren(child.props.children, map));
      }
      return React.cloneElement(child, hasPropTypes ? {[MAP]: map} : {});
    });
  }

  getBMap() {
    return this.map;
  }
}

export default wrapClass(BaiduMap, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
