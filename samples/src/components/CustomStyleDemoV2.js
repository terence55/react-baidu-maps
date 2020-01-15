import React from 'react';
import BaiduMap from '../../../src/BaiduMap';
import asyncWrapper from '../../../src/async/asyncWrapper';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class CustomStyleDemo extends React.Component {
  render() {
    const styleJson = [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: {
          hue: '#007fff',
          saturation: 89
        }
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: {
          color: '#ffffff'
        }
      }
    ];
    // Should remove <script> in html for v3 to display old style correctly
    return (
      <div>
        <div style={{background: '#444', height: '400px'}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
            id='asyncmap'
            enableScrollWheelZoom
            enableDragging
            zoom={15}
            mapStyle={styleJson}
            mapContainer={<div style={{height: '100%'}} />}
          />
        </div>
      </div>
    );
  }
}
