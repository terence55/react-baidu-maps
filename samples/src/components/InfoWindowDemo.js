import React from 'react';
import {BaiduMap, asyncWrapper, InfoWindow, Marker} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class AsyncDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {lng: 116.204, lat: 39.915},
      content: 'I am haha'
    };
  }

  render() {
    const {position, content} = this.state;
    return (
      <div>
        <div style={{height: '400px'}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
            id='asyncmap1'
            enableDragging
            mapContainer={<div style={{height: '100%'}} />}
          >
            <InfoWindow position={position} content={content} />
            <Marker position={{lng: 116.404, lat: 39.915}} onClick={() => console.warn('click marker')}>
              <InfoWindow content='marker infoWindow' offset={{width: 0, height: -20}} />
            </Marker>
            <Marker position={{lng: 116.904, lat: 39.915}} onClick={() => console.warn('click marker')}>
              <InfoWindow content="<div style='color: red;'>I am red</div>" offset={{width: 0, height: -20}} />
            </Marker>
          </AsyncMap>
        </div>
      </div>
    );
  }
}
