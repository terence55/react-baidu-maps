import React from 'react';
import BaiduMap from '../../../src/BaiduMap';

export default class SimpleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15,
      enableDragging: true
    };
  }

  render() {
    return (
      <div>
        <div style={{ background: '#444', height: '200px' }}>
          <BaiduMap
            id="map1"
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            zoom={this.state.zoom}
            mapContainer={<div style={{ height: '100%' }} />} />
        </div>
        <div style={{ background: '#444', height: '300px', marginTop: 30 }}>
          <BaiduMap
            id="map2"
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            zoom={this.state.zoom}
            mapContainer={<div style={{ height: '100%' }} />} />
        </div>
      </div>
    );
  }
}
