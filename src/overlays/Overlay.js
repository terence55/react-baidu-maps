/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import BaseOverlay from './BaseOverlay';

/**
 * Overlay
 * @author terencewu
 */

const publicMethodMap = [
  'isVisible',
  'show',
  'hide'
];

class Overlay extends BaseOverlay {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    customConstructor: PropTypes.func,
    constructorParams: PropTypes.object,
    initialize: PropTypes.func,
    draw: PropTypes.func
  };

  componentDidMount() {
    const {customConstructor, constructorParams, initialize, draw} = this.props;
    const CustomOverlayClass = this.getOverlayClass(customConstructor, initialize, draw);
    this.instance = new CustomOverlayClass(constructorParams); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.instance);
  }

  getOverlayClass(customConstructor, initialize, draw) {
    return class CustomOverlay extends BMap.Overlay { // eslint-disable-line
      static displayName = 'CustomOverlay';

      constructor(params) {
        super();
        if (customConstructor) {
          customConstructor(this, params);
        }
      }

      initialize(map) {
        if (initialize) {
          initialize(this, map);
        }
      }

      draw() {
        if (draw) {
          draw(this);
        }
      }
    };
  }
}

export default wrapClass(Overlay, null, null, publicMethodMap);
