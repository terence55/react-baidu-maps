import React from 'react';
import BaiduMap from '../../../src/BaiduMap';
import asyncWrapper from '../../../src/async/asyncWrapper';
import { MAP_KEY } from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class AsyncDemo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.refs.map.getWrappedInstance().panTo(new BMap.Point(113.262232, 23.154345)); // eslint-disable-line no-undef
    // }, 3000);
  }

  render() {
    return (
      <div>
        <div style={{ background: '#444', height: '400px' }}>
          <AsyncMap
            ref="map"
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{ textAlign: 'center', fontSize: 40 }}>Loading.....</div>}
            id="asyncmap"
            enableScrollWheelZoom
            enableDragging
            zoom={15}
            onTilesloaded={() => console.warn('onTilesloaded...')}
            onMapInstantiated={(instance) => { console.warn('onMapInstantiated map bounds:', instance.getBounds()); }}
            mapContainer={<div style={{ height: '100%' }} />} />
        </div>
      </div>
    );
  }
}
