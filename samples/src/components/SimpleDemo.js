import React from 'react';
import BaiduMap from '../../../src/BaiduMap';

const defaultZoom = 15;
const defaultCenter = { lng: 118.127294, lat: 24.438853 };

export default class SimpleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: defaultZoom,
      center: defaultCenter,
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
            defaultZoom={this.state.zoom}
            mapContainer={<div style={{ height: '100%' }} />} />
        </div>
        <div style={{ height: '300px', marginTop: 30 }}>
          <button onClick={() => { this.setState({ center: { lng: 108.956223, lat: 34.224145 } }); }}>Center1</button>
          <button onClick={() => { this.setState({ center: { lng: 121.454492, lat: 31.22962 } }); }}>Center2</button>
          <button onClick={() => { this.setState({ center: { lng: 113.352135, lat: 23.132866 } }); }}>Center3</button>
          <BaiduMap
            id="map2"
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            center={this.state.center}
            zoom={this.state.zoom}
            mapContainer={<div style={{ height: '100%' }} />} />
        </div>
      </div>
    );
  }
}
