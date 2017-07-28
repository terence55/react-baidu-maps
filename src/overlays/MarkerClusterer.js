import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP, MARKER_CLUSTERER } from '../utils/constants';

/**
 * MarkerClusterer
 * @author terencewu
 */

const controlledPropTypes = {
  gridSize: PropTypes.number,
  maxZoom: PropTypes.number,
  minClusterSize: PropTypes.number,
  styles: PropTypes.object
};

const controlledPropUpdater = {
  gridSize(obj, arg) { obj.setGridSize(arg); },
  maxZoom(obj, arg) { obj.setMaxZoom(arg); },
  minClusterSize(obj, arg) { obj.setMinClusterSize(arg); },
  styles(obj, arg) { obj.setStyles(arg); }
};

const publicMethodMap = [
  'getMap',
  'addMarker',
  'addMarkers',
  'clearMarkers',
  'getClustersCount',
  'isAverageCenter',
  'removeMarker',
  'removeMarkers'
];

class MarkerClusterer extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object
  };

  constructor(props) {
    super(props);
    require('../addons/BaiduMarkerClusterer'); // eslint-disable-line global-require
    this.markerClusterer = new BMapLib.MarkerClusterer(this.props[MAP], {}); // eslint-disable-line no-undef
  }

  getInstanceFromComponent(component) {
    return component.markerClusterer;
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    const markerClusterer = this.markerClusterer;
    if (children) {
      return (
        <div>
          {React.Children.map(children, (child) => {
            const hasPropTypes = child.type.propTypes && child.type.propTypes[MARKER_CLUSTERER] !== undefined;
            return React.cloneElement(child, hasPropTypes ? { [MARKER_CLUSTERER]: markerClusterer } : {});
          })}
        </div>);
    }
    return false;
  }
}

export default wrapClass(MarkerClusterer, controlledPropTypes, controlledPropUpdater, publicMethodMap);
