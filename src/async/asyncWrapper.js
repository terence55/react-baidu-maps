import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';

/**
 * Wrapper for Asynchronous Load of Baidu Map
 * @author terencewu
 */

export default function asyncWrapper(WrappedComponent, extraProps) {
  return class Container extends Component {
    static displayName = `asyncWrapper(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      useScriptjs: PropTypes.bool,
      mapUrl: PropTypes.string.isRequired,
      loadingElement: PropTypes.element.isRequired,
      onMapSrcLoaded: PropTypes.func,
      isBMapAvailable: PropTypes.func
    };

    static defaultProps = {
      useScriptjs: false
    };

    constructor(props) {
      super(props);
      this.isUnmounted = false;
      this.handleLoaded = this.handleLoaded.bind(this);
      this.state = {
        loading: true
      };
    }

    componentDidMount() {
      this.loadMap();
    }

    componentWillUnmount() {
      this.isUnmounted = true;
    }

    loadMap() {
      const {useScriptjs, mapUrl} = this.props;
      if (this.isBMapAvailable()) {
        this.handleLoaded();
        return;
      }
      if (window.loadingMap) {
        setTimeout(() => {
          this.loadMap();
        }, 300);
      } else if (useScriptjs) {
        window.loadingMap = true;
        const scriptjs = require('scriptjs'); // eslint-disable-line global-require
        scriptjs(mapUrl, () => {
          delete window.loadingMap;
        });
        setTimeout(() => {
          this.handleLoaded();
        }, 300);
      } else if (!window.initBaiduMap) {
        window.loadingMap = true;
        window.initBaiduMap = () => {
          delete window.loadingMap;
        };
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `${mapUrl}&callback=initBaiduMap`;
        document.body.appendChild(script);
        setTimeout(() => {
          this.handleLoaded();
        }, 300);
      }
    }

    handleLoaded() {
      if (!this.isBMapAvailable()) {
        setTimeout(() => {
          this.handleLoaded();
        }, 300);
        return;
      }
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        loading: false
      }, () => {
        const {onMapSrcLoaded} = this.props;
        if (onMapSrcLoaded) {
          onMapSrcLoaded();
        }
      });
    }

    getWrappedInstance() {
      return this[`wrappedInstanceMap${this.props.id}`];
    }

    isBMapAvailable() {
      const {isBMapAvailable} = extraProps;
      if (isBMapAvailable !== undefined) {
        return isBMapAvailable();
      }
      if (typeof BMap === 'undefined') { // eslint-disable-line no-undef
        return false;
      }
      return BMap.Map !== undefined; // eslint-disable-line no-undef
    }

    render() {
      const {useScriptjs, mapUrl, loadingElement, onMapSrcLoaded, ...restProps} = this.props;
      const {loading} = this.state;
      if (!loading) {
        return <WrappedComponent ref={(instance) => (this[`wrappedInstanceMap${this.props.id}`] = instance)} {...restProps} />; // eslint-disable-line react/prop-types
      }
      return loadingElement;
    }
  };
}
