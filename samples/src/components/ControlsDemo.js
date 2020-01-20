import React from 'react';
import {BaiduMap, asyncWrapper, NavigationControl, ScaleControl, MapTypeControl, OverviewMapControl, CopyrightControl, GeolocationControl} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class ControlsDemo extends React.Component {
  render() {
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
            mapContainer={<div style={{height: '100%'}} />}
          >
            <NavigationControl />
            <ScaleControl />
            <MapTypeControl />
            <OverviewMapControl isOpen />
            <GeolocationControl
              onLocationSuccess={(e) => {
                let address = '';
                address += e.addressComponent.province;
                address += e.addressComponent.city;
                address += e.addressComponent.district;
                address += e.addressComponent.street;
                address += e.addressComponent.streetNumber;
                console.warn(`Current Location: ${address}`);
              }}
            />
            <CopyrightControl
              anchor='bottom_right'
              copyrights={[
                {
                  id: 1,
                  content: "<div href='#' style='font-size:20px;background:yellow'>我是自定义版权控件</div>",
                  bounds: {
                    sw: {
                      lng: 116.055026,
                      lat: 39.591042
                    },
                    ne: {
                      lng: 116.752974,
                      lat: 40.237421
                    }
                  }
                }]}
            />
          </AsyncMap>
        </div>
      </div>
    );
  }
}
