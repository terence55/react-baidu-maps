import React from 'react';
import {BaiduMap, asyncWrapper} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class RestrictedDemo extends React.Component {
  render() {
    const bounds = {
      sw: {
        lng: 116.027143,
        lat: 39.772348
      },
      ne: {
        lng: 116.832025,
        lat: 40.126349
      }
    };
    return (
      <div>
        <div style={{background: '#444', height: '400px'}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
            id='asyncmap'
            enableScrollWheelZoom
            enableDragging
            zoom={13}
            restrictedBounds={bounds}
            mapContainer={<div style={{height: '100%'}} />}
          />
        </div>
      </div>
    );
  }
}
