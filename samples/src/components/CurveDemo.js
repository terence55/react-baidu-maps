import React from 'react';
import {BaiduMap, Curve} from 'react-baidu-maps';

const defaultZoom = 6;
const defaultCenter = {lng: 118.454, lat: 32.955};

export default class CurveDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: defaultZoom,
      center: defaultCenter,
      enableDragging: true
    };
  }

  render() {
    const path = [
      {lng: 116.432045, lat: 39.910683},
      {lng: 120.129721, lat: 30.314429},
      {lng: 121.491121, lat: 25.127053}
    ];
    return (
      <div>
        <div style={{background: '#444', height: '600px'}}>
          <BaiduMap
            id='map1'
            ref={(instance) => this.map = instance}
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            defaultZoom={this.state.zoom}
            center={this.state.center}
            mapContainer={<div style={{height: '100%'}} />}
          >
            <Curve
              zIndex={10}
              path={path}
              strokeColor='blue'
              strokeWeight={3}
              strokeOpacity={0.5}
            />
          </BaiduMap>
        </div>
      </div>
    );
  }
}
