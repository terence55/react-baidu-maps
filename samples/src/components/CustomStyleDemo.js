import React from 'react';
import {BaiduMap} from 'react-baidu-maps';

const defaultZoom = 15;
const defaultCenter = {lng: 118.127294, lat: 24.438853};

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
    const st = [{
      featureType: 'land',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#4a90e2ff'
      }
    }, {
      featureType: 'water',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#bedbf9ff'
      }
    }, {
      featureType: 'green',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#d0edccff'
      }
    }, {
      featureType: 'building',
      elementType: 'geometry',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'building',
      elementType: 'geometry.fill',
      stylers: {
        color: '#ffffffb3'
      }
    }, {
      featureType: 'building',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#dadadab3'
      }
    }, {
      featureType: 'subwaystation',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#b15454B2'
      }
    }, {
      featureType: 'education',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#e4f1f1ff'
      }
    }, {
      featureType: 'medical',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#f0dedeff'
      }
    }, {
      featureType: 'scenicspots',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        color: '#e2efe5ff'
      }
    }, {
      featureType: 'highway',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        weight: 4
      }
    }, {
      featureType: 'highway',
      elementType: 'geometry.fill',
      stylers: {
        color: '#f7c54dff'
      }
    }, {
      featureType: 'highway',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#fed669ff'
      }
    }, {
      featureType: 'highway',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'highway',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#8f5a33ff'
      }
    }, {
      featureType: 'highway',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'highway',
      elementType: 'labels.icon',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'arterial',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        weight: 2
      }
    }, {
      featureType: 'arterial',
      elementType: 'geometry.fill',
      stylers: {
        color: '#d8d8d8ff'
      }
    }, {
      featureType: 'arterial',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#ffeebbff'
      }
    }, {
      featureType: 'arterial',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'arterial',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#525355ff'
      }
    }, {
      featureType: 'arterial',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'local',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        weight: 1
      }
    }, {
      featureType: 'local',
      elementType: 'geometry.fill',
      stylers: {
        color: '#d8d8d8ff'
      }
    }, {
      featureType: 'local',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'local',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'local',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#979c9aff'
      }
    }, {
      featureType: 'local',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'railway',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        weight: 1
      }
    }, {
      featureType: 'railway',
      elementType: 'geometry.fill',
      stylers: {
        color: '#949494ff'
      }
    }, {
      featureType: 'railway',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'subway',
      elementType: 'geometry',
      stylers: {
        visibility: 'on',
        weight: 1
      }
    }, {
      featureType: 'subway',
      elementType: 'geometry.fill',
      stylers: {
        color: '#d8d8d8ff'
      }
    }, {
      featureType: 'subway',
      elementType: 'geometry.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'subway',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'subway',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#979c9aff'
      }
    }, {
      featureType: 'subway',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'continent',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'continent',
      elementType: 'labels.icon',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'continent',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#333333ff'
      }
    }, {
      featureType: 'continent',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'city',
      elementType: 'labels.icon',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'city',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'city',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#454d50ff'
      }
    }, {
      featureType: 'city',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }, {
      featureType: 'town',
      elementType: 'labels.icon',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'town',
      elementType: 'labels',
      stylers: {
        visibility: 'on'
      }
    }, {
      featureType: 'town',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#454d50ff'
      }
    }, {
      featureType: 'town',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#ffffffff'
      }
    }];
    return (
      <div>
        <div style={{background: '#444', height: '200px'}}>
          <BaiduMap
            id='map1'
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            defaultZoom={this.state.zoom}
            mapContainer={<div style={{height: '100%'}} />}
          />
        </div>
        <div style={{height: '300px', marginTop: 30}}>
          <button onClick={() => { this.setState({center: {lng: 108.956223, lat: 34.224145}}); }}>Center1</button>
          <button onClick={() => { this.setState({center: {lng: 121.454492, lat: 31.22962}}); }}>Center2</button>
          <button onClick={() => { this.setState({center: {lng: 113.352135, lat: 23.132866}}); }}>Center3</button>
          <BaiduMap
            id='map2'
            defaultCenter={defaultCenter}
            mapStyle={st}
            defaultZoom={defaultZoom}
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            center={this.state.center}
            zoom={this.state.zoom}
            mapContainer={<div style={{height: '100%'}} />}
          />
        </div>
      </div>
    );
  }
}
