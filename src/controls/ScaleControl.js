import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';
import { Size } from '../utils/MapPropTypes';
import { getLengthUnit, getControlAnchor, toBMapSize } from '../utils/typeTransform';

/**
 * ScaleControl
 * @author terencewu
 */

const controlledPropTypes = {
  unit: PropTypes.oneOf(['metric', 'imperial'])
};

const controlledPropUpdater = {
  type(obj, arg) { obj.setUnit(getLengthUnit(arg)); }
};

const publicMethodMap = [
  'getUnit'
];

class ScaleControl extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object,
    anchor: PropTypes.oneOf(['top_left', 'top_right', 'bottom_left', 'bottom_right']),
    offset: PropTypes.shape(Size)
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.scaleControl;
  }

  componentDidMount() {
    const { anchor, offset } = this.props; // eslint-disable-line react/prop-types
    const option = {};
    if (anchor) {
      option.anchor = getControlAnchor(anchor);
    }
    if (offset) {
      option.offset = toBMapSize(offset);
    }
    this.scaleControl = new BMap.ScaleControl(option); // eslint-disable-line no-undef
    this.props[MAP].addControl(this.scaleControl);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }
}

export default wrapClass(ScaleControl, controlledPropTypes, controlledPropUpdater, publicMethodMap);
