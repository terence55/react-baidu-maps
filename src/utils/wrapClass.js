/**
 * Wrap Class with Custom PropTypes, Public Methods and Events
 * @author terencewu
 */

function registerEvents(component, instance, eventMap) {
  if (eventMap && instance.addEventListener) {
    component.registeredEvents = {};
    eventMap.forEach((key) => {
      const methodName = `on${key.substr(0, 1).toUpperCase()}${key.substr(1)}`;
      if (component.props[methodName] && typeof component.props[methodName] === 'function') {
        instance.addEventListener(key, component.props[methodName]);
        component.registeredEvents[key] = component.props[methodName];
      }
    });
  }
}

function unregisterEvents(component, instance) {
  if (component.registeredEvents && instance.removeEventListener) {
    Object.keys(component.registeredEvents).forEach((key) => {
      instance.removeEventListener(key, component.registeredEvents[key]);
    });
    component.registeredEvents = null;
  }
}

function wrapControlledPropTypes(WrappedComponent, controlledPropTypes, controlledPropUpdater) {
  const getInstanceFromComponent = WrappedComponent.prototype.getInstanceFromComponent;
  const componentDidMount = WrappedComponent.prototype.componentDidMount;
  const componentDidUpdate = WrappedComponent.prototype.componentDidUpdate;
  if (!getInstanceFromComponent) {
    return WrappedComponent;
  }
  if (controlledPropTypes && Object.keys(controlledPropTypes).length > 0) {
    WrappedComponent.prototype.componentDidMount = function() {
      if (componentDidMount) {
        componentDidMount.call(this);
      }
      Object.keys(controlledPropTypes).forEach((key) => {
        if (this.props[key] !== undefined) {
          const fn = controlledPropUpdater[key];
          if (fn) {
            fn(getInstanceFromComponent(this), this.props[key], this);
          }
        }
      });
    };
    WrappedComponent.prototype.componentDidUpdate = function(prevProps, prevState) {
      Object.keys(controlledPropTypes).forEach((key) => {
        const nextValue = this.props[key];
        const fn = controlledPropUpdater[key];
        if (fn && nextValue !== prevProps[key]) {
          fn(getInstanceFromComponent(this), nextValue, this);
        }
      });
      if (componentDidUpdate) {
        componentDidUpdate.call(this, prevProps, prevState);
      }
    };
  }
  return WrappedComponent;
}

function wrapPublicMethods(WrappedComponent, publicMethodMap) {
  const getInstanceFromComponent = WrappedComponent.prototype.getInstanceFromComponent;
  if (!getInstanceFromComponent) {
    return WrappedComponent;
  }
  if (publicMethodMap && publicMethodMap.length > 0) {
    publicMethodMap.forEach((key) => {
      WrappedComponent.prototype[key] = function publicMethod(...args) {
        return getInstanceFromComponent(this)[key](...args);
      };
    });
  }
  return WrappedComponent;
}

function wrapEvents(WrappedComponent, eventMap) {
  const getInstanceFromComponent = WrappedComponent.prototype.getInstanceFromComponent;
  const componentDidUpdate = WrappedComponent.prototype.componentDidUpdate;
  const componentDidMount = WrappedComponent.prototype.componentDidMount;
  const componentWillUnmount = WrappedComponent.prototype.componentWillUnmount;
  if (eventMap && eventMap.length > 0) {
    WrappedComponent.prototype.componentDidMount = function() {
      if (componentDidMount) {
        componentDidMount.call(this);
      }
      registerEvents(this, getInstanceFromComponent(this), eventMap);
    };
    WrappedComponent.prototype.componentDidUpdate = function(prevProps, prevState) {
      unregisterEvents(this, getInstanceFromComponent(this));
      if (componentDidUpdate) {
        componentDidUpdate.call(this, prevProps, prevState);
      }
      registerEvents(this, getInstanceFromComponent(this), eventMap);
    };
    WrappedComponent.prototype.componentWillUnmount = function() {
      unregisterEvents(this, getInstanceFromComponent(this));
      if (componentWillUnmount) {
        componentWillUnmount.call(this);
      }
    };
  }
  return WrappedComponent;
}

export default function wrapClass(WrappedComponent, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap) {
  let component = wrapControlledPropTypes(WrappedComponent, controlledPropTypes, controlledPropUpdater);
  component = wrapPublicMethods(component, publicMethodMap);
  component = wrapEvents(component, eventMap);
  return component;
}
