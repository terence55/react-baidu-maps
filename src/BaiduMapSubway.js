import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from './utils/wrapClass';
import {MAP} from './utils/constants';

/**
 * BaiduMap Component
 * @author terencewu
 */

const controlledPropTypes = {
  city: PropTypes.string,
  center: PropTypes.string,
  zoom: PropTypes.number
};

const controlledPropUpdater = {
  city(obj, arg) { obj.setCity(arg); },
  center(obj, arg) { obj.setCenter(arg); },
  zoom(obj, arg) { obj.setZoom(arg); }
};

const publicMethodMap = [
  'setCity',
  'getCurrentCity',
  'setCenter',
  'setZoom',
  'getZoom',
  'zoomIn',
  'zoomOut',
  'clearMarkers',
  'openInfoWindow',
  'closeInfoWindow',
  'clearOverlays',
  'getStation',
  'addControl',
  'removeControl',
  'getLines'
];

const eventMap = [
  'subwayloaded',
  'tap',
  'directioncomplete'
];

class BaiduMapSubway extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    mapContainer: PropTypes.node.isRequired,
    defaultCity: PropTypes.string,
    defaultCenter: PropTypes.string,
    defaultZoom: PropTypes.number,
    onMapInstantiated: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.id = props.id || 'allmap';
  }

  getInstanceFromComponent(component) {
    return component.map;
  }

  componentDidMount() {
    if (typeof BMapSub === 'undefined') { // eslint-disable-line no-undef
      console.error('BMapSub is not defined. Make sure you\'ve import script.');
      return;
    }
    const {defaultCity, defaultCenter, defaultZoom, onMapInstantiated} = this.props;
    this.map = new BMapSub.Subway(this.id, defaultCity || '131'); // eslint-disable-line no-undef
    const zoom = defaultZoom || 0.5;
    this.map.setZoom(zoom);
    if (defaultCenter !== undefined) {
      this.map.setCenter(defaultCenter);
    }
    if (onMapInstantiated) {
      onMapInstantiated(this);
    }
    this.forceUpdate();
  }

  render() {
    const {mapContainer, children} = this.props; // eslint-disable-line react/prop-types
    const map = this.map;
    if (!map || !children) {
      return React.cloneElement(mapContainer, {id: this.id});
    }
    return React.cloneElement(mapContainer, {id: this.id}, this.renderChildren(children, map));
  }

  renderChildren(children, map) {
    return React.Children.map(children, (child) => {
      const hasPropTypes = child.type.propTypes && child.type.propTypes[MAP] !== undefined;
      if (child.props.children) {
        return React.cloneElement(child,
          hasPropTypes ? {[MAP]: map} : {},
          this.renderChildren(child.props.children, map));
      }
      return React.cloneElement(child, hasPropTypes ? {[MAP]: map} : {});
    });
  }

  getBMapSubway() {
    return this.map;
  }
}

export default wrapClass(BaiduMapSubway, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
