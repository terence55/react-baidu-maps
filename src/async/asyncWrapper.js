import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';

/**
 * Wrapper for Asynchronous Load of Baidu Map
 * @author terencewu
 */

export default function asyncWrapper(WrappedComponent) {
  return class Container extends Component {
    static displayName = `asyncWrapper(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      useScriptjs: PropTypes.bool,
      mapUrl: PropTypes.string.isRequired,
      loadingElement: PropTypes.element.isRequired,
      onMapSrcLoaded: PropTypes.func
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
      const {useScriptjs, mapUrl} = this.props;
      if (typeof BMap !== 'undefined') {
        this.handleLoaded();
        return;
      }
      if (useScriptjs) {
        const scriptjs = require('scriptjs'); // eslint-disable-line global-require
        scriptjs(mapUrl, this.handleLoaded);
      } else if (!window.initBaiduMap) {
        window.initBaiduMap = () => {
          this.handleLoaded();
        };
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `${mapUrl}&callback=initBaiduMap`;
        document.body.appendChild(script);
      }
    }

    componentWillUnmount() {
      this.isUnmounted = true;
    }

    handleLoaded() {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        loading: false
      });
      const {onMapSrcLoaded} = this.props;
      if (onMapSrcLoaded) {
        onMapSrcLoaded();
      }
    }

    getWrappedInstance() {
      return this[`wrappedInstanceMap${this.props.id}`];
    }

    render() {
      const {useScriptjs, mapUrl, loadingElement, onMapSrcLoaded, ...restProps} = this.props;
      const {loading} = this.state;
      if (!loading) {
        return <WrappedComponent ref={(instance) => { this[`wrappedInstanceMap${this.props.id}`] = instance; }} {...restProps} />; // eslint-disable-line react/prop-types
      }
      return loadingElement;
    }
  };
}
