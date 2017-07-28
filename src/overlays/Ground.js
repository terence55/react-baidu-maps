import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';
import { Bounds } from '../utils/MapPropTypes';
import { toBMapBounds } from '../utils/typeTransform';

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

class Ground extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.ground;
  }

  componentDidMount() {
    const { bounds } = this.props; // eslint-disable-line react/prop-types
    this.ground = new BMap.GroundOverlay(toBMapBounds(bounds)); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.ground);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(Ground, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
