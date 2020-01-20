import asyncWrapper from './asyncWrapper';

/**
 * Wrapper for Asynchronous Load of Baidu Map
 * @author terencewu
 */

export default function asyncSubwayWrapper(WrappedComponent) {
  return asyncWrapper(WrappedComponent, {
    isBMapAvailable() {
      if (typeof BMapSub === 'undefined') { // eslint-disable-line no-undef
        return false;
      }
      return BMapSub.Subway !== undefined; // eslint-disable-line no-undef
    }
  });
}
