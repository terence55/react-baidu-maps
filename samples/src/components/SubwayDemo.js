import React from 'react';
import {BaiduMapSubway, asyncSubwayWrapper} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncSubwayWrapper(BaiduMapSubway);

export default class SubwayDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{background: '#444', height: '600px'}}>
          <AsyncMap
            ref={(instance) => (this.map1 = instance)}
            mapUrl={`http://api.map.baidu.com/api?type=subway&v=1.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
            id='asyncmap1'
            onMapSrcLoaded={() => console.log('onMapSrcLoaded')}
            mapContainer={<div style={{height: '100%'}} />}
            city='289'
          />
        </div>
      </div>
    );
  }
}
