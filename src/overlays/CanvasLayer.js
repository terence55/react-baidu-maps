import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP} from '../utils/constants';
import BaseOverlay from './BaseOverlay';

/**
 * CanvasLayer
 * @author terencewu
 */

const controlledPropTypes = {
  zIndex: PropTypes.number,
  paneName: PropTypes.string,
  update: PropTypes.func
};

const controlledPropUpdater = {
  zIndex(obj, arg) { if (!obj || !obj.options) return; obj.options.zIndex = arg; obj.zIndex = arg; },
  paneName(obj, arg) { if (!obj || !obj.options) return; obj.options.paneName = arg; },
  update(obj, arg) { if (!obj || !obj.options) return; obj.options.update = function() { arg(this.canvas); }; // eslint-disable-line brace-style
  }
};

const publicMethodMap = [
];

const eventMap = [
];

class CanvasLayer extends BaseOverlay {
  static propTypes = {
    [MAP]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  componentDidMount() {
    if (BMap.CanvasLayer === undefined) { // eslint-disable-line no-undef
      return;
    }
    const {zIndex, paneName, update} = this.props; // eslint-disable-line react/prop-types
    const options = {};
    if (zIndex !== undefined) {
      options.zIndex = zIndex;
    }
    if (paneName !== undefined) {
      options.paneName = paneName;
    }
    if (update !== undefined) {
      options.update = function() { update(this.canvas); };
    }
    this.instance = new BMap.CanvasLayer(options); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.instance);
  }
}

export default wrapClass(CanvasLayer, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
