import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import {MAP, MARKER} from '../utils/constants';
import {Point, Size} from '../utils/MapPropTypes';
import {toBMapPoint, toBMapSize} from '../utils/typeTransform';

/**
 * InfoWindow
 * @author terencewu
 */

const controlledPropTypes = {
  size: PropTypes.shape(Size),
  title: PropTypes.string,
  content: PropTypes.string,
  enableMaximize: PropTypes.bool,
  maxContent: PropTypes.string,
  enableAutoPan: PropTypes.bool,
  enableCloseOnClick: PropTypes.bool
};

const controlledPropUpdater = {
  size(obj, arg) { obj.setWidth(arg.width); obj.setHeight(arg.height); },
  title(obj, arg) { obj.setTitle(arg); },
  content(obj, arg) { obj.setContent(arg); },
  enableMaximize(obj, arg) { if (arg) obj.enableMaximize(); else obj.disableMaximize(); },
  maxContent(obj, arg) { obj.setMaxContent(arg); },
  enableAutoPan(obj, arg) { if (arg) obj.enableAutoPan(); else obj.disableAutoPan(); },
  enableCloseOnClick(obj, arg) { if (arg) obj.enableCloseOnClick(); else obj.disableCloseOnClick(); }
};

const publicMethodMap = [
  'redraw',
  'getTitle',
  'getContent',
  'getPosition',
  'isOpen',
  'maximize',
  'restore'
];

const eventMap = [
  'close',
  'open',
  'maximize',
  'restore',
  'clickclose'
];

class InfoWindow extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    [MARKER]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    position: PropTypes.shape(Point), // eslint-disable-line react/no-unused-prop-types
    maxWidth: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    offset: PropTypes.shape(Size), // eslint-disable-line react/no-unused-prop-types
    enableMessage: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    message: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    trigger: PropTypes.oneOf(['hover', 'click']) // eslint-disable-line react/no-unused-prop-types
  };

  constructor(props) {
    super(props);
    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  getInstanceFromComponent(component) {
    return component.infoWindow;
  }

  componentDidMount() {
    this.configWindow(this.props);
  }

  componentDidUpdate() {
    this.configWindow(this.props);
  }

  componentWillUnmount() {
    if (this.props[MARKER]) {
      const {trigger} = this.props;
      if (trigger === 'hover') {
        this.props[MARKER].removeEventListener('mouseover', this.openWindow);
        this.props[MARKER].removeEventListener('mouseout', this.closeWindow);
      } else {
        this.props[MARKER].removeEventListener('click', this.openWindow);
      }
    }
  }

  render() {
    const {children} = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }

  configWindow(props) {
    this.closeWindow();
    const {position, content, maxWidth, offset, enableMessage, message, trigger} = props; // eslint-disable-line react/prop-types
    const options = {};
    if (maxWidth !== undefined) {
      options.maxWidth = maxWidth;
    }
    if (offset !== undefined) {
      options.offset = toBMapSize(offset);
    }
    if (enableMessage !== undefined) {
      options.enableMessage = enableMessage;
    }
    if (message !== undefined) {
      options.message = message;
    }
    this.infoWindow = new BMap.InfoWindow(content, options); // eslint-disable-line no-undef
    if (this.props[MARKER]) {
      if (trigger === 'hover') {
        this.props[MARKER].addEventListener('mouseover', this.openWindow);
        this.props[MARKER].addEventListener('mouseout', this.closeWindow);
      } else {
        this.props[MARKER].addEventListener('click', this.openWindow);
      }
    } else if (position !== undefined) {
      this.props[MAP].openInfoWindow(this.infoWindow, toBMapPoint(position));
    }
  }

  openWindow() {
    this.props[MAP].openInfoWindow(this.infoWindow, toBMapPoint(this.props[MARKER].getPosition()));
  }

  closeWindow() {
    if (this.infoWindow && this.infoWindow.isOpen()) {
      this.props[MAP].closeInfoWindow();
    }
  }
}

export default wrapClass(InfoWindow, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);
