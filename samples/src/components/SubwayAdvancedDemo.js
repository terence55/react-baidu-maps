import React from 'react';
import {BaiduMapSubway, asyncSubwayWrapper, SubwayMarker, SubwayZoomControl} from 'react-baidu-maps';
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
            city='131'
            defaultZoom={1}
            defaultCenter='西直门'
            onSubwayloaded={() => console.log('Subway loaded')}
            onTap={(e) => console.log('Click station', e.station)}
          >
            <SubwayMarker
              station='西直门'
              icon={{
                url: 'https://api.map.baidu.com/images/subway/start-bak.png',
                size: {
                  width: 50,
                  height: 80
                }
              }}
            />
            <SubwayZoomControl
              anchor='top_right'
            />
          </AsyncMap>
        </div>
      </div>
    );
  }
}
