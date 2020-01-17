import React from 'react';
import {BaiduMap, asyncWrapper} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

const defaultZoom = 15;
const defaultCenter = {lng: 118.127294, lat: 24.438853};

export default class AsyncDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: defaultZoom,
      center: defaultCenter
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.map1.getWrappedInstance());
    }, 1000);
  }

  render() {
    return (
      <div>
        <div style={{height: '200px'}}>
          <AsyncMap
            ref={(instance) => (this.map1 = instance)}
            mapUrl={`http://api.map.baidu.com/api?v=3.0&ak=${MAP_KEY}`}
            loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
            id='asyncmap1'
            enableDragging
            onMapSrcLoaded={() => console.log('onMapSrcLoaded')}
            mapContainer={<div style={{height: '100%'}} />}
          />
        </div>
        <div>
          <div style={{height: '400px', marginTop: 10}}>
            <button onClick={() => { this.setState({center: {lng: 108.956223, lat: 34.224145}}); }}>Center1</button>
            <button onClick={() => { this.setState({center: {lng: 121.454492, lat: 31.22962}}); }}>Center2</button>
            <button onClick={() => { this.setState({center: {lng: 113.352135, lat: 23.132866}}); }}>Center3</button>
            <AsyncMap
              mapUrl={`http://api.map.baidu.com/api?v=3.0&ak=${MAP_KEY}`}
              loadingElement={<div style={{textAlign: 'center', fontSize: 40}}>Loading.....</div>}
              id='asyncmap2'
              enableScrollWheelZoom
              enableDragging
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              center={this.state.center}
              zoom={this.state.zoom}
              onTilesloaded={() => console.warn('onTilesloaded...')}
              onMapInstantiated={(instance) => { console.warn('onMapInstantiated map bounds:', instance.getBounds()); }}
              mapContainer={<div style={{height: '100%'}} />}
            />
          </div>
        </div>
      </div>
    );
  }
}
