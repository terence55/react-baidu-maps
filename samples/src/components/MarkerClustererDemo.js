import React from 'react';
import {BaiduMap, asyncWrapper, Marker, MarkerClusterer} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class MarkerClustererDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 3,
      center: {lng: 113.57081628597025, lat: 38.77218977026637}
    };
    const MAX = 30;
    this.markerClusterer = [];
    for (let i = 0; i < MAX; i++) {
      this.markerClusterer.push({
        lng: (Math.random() * 40) + 85,
        lat: (Math.random() * 30) + 21
      });
    }
    const EXAMPLE_URL = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/';
    this.myStyles = [{
      url: `${EXAMPLE_URL}images/heart30.png`,
      size: new BMap.Size(30, 26), // eslint-disable-line no-undef
      opt_anchor: [16, 0],
      textColor: '#ff00ff',
      opt_textSize: 10
    }, {
      url: `${EXAMPLE_URL}images/heart40.png`,
      size: new BMap.Size(40, 35), // eslint-disable-line no-undef
      opt_anchor: [40, 35],
      textColor: '#ff0000',
      opt_textSize: 12
    }, {
      url: `${EXAMPLE_URL}images/heart50.png`,
      size: new BMap.Size(50, 44), // eslint-disable-line no-undef
      opt_anchor: [32, 0],
      textColor: 'white',
      opt_textSize: 14
    }];
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div style={{background: '#444', height: '400px', width: '45%'}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div>Loading.....</div>}
            id='asyncmap1'
            enableScrollWheelZoom
            enableDragging
            center={this.state.center}
            zoom={this.state.zoom}
            onZoomend={({target}) => {
              this.setState({
                center: target.getCenter(),
                zoom: target.getZoom()
              });
              this.map2.getWrappedInstance().getBMap().zoomTo(target.getZoom());
              this.map2.getWrappedInstance().getBMap().panTo(target.getCenter());
            }}
            onMoveend={({target}) => {
              this.setState({
                center: target.getCenter(),
                zoom: target.getZoom()
              });
              this.map2.getWrappedInstance().getBMap().zoomTo(target.getZoom());
              this.map2.getWrappedInstance().getBMap().panTo(target.getCenter());
            }}
            mapContainer={<div style={{height: '100%'}} />}
          >
            <MarkerClusterer>
              {
                this.markerClusterer.map((position, index) => <Marker key={index} position={position} />) // eslint-disable-line react/no-array-index-key
              }
            </MarkerClusterer>
          </AsyncMap>
        </div>
        <div style={{background: '#444', height: '400px', width: '45%', position: 'absolute', top: 0, right: 0}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div>Loading.....</div>}
            id='asyncmap2'
            ref={(instance) => (this.map2 = instance)}
            enableScrollWheelZoom
            enableDragging
            mapContainer={<div style={{height: '100%'}} />}
          >
            {
              this.markerClusterer.map((position, index) => <Marker key={index} position={position} />) // eslint-disable-line react/no-array-index-key
            }
          </AsyncMap>
        </div>
        <div style={{background: '#444', height: '400px', marginTop: 10}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div>Loading.....</div>}
            id='asyncmap3'
            enableScrollWheelZoom
            enableDragging
            center={this.state.center}
            zoom={this.state.zoom}
            mapContainer={<div style={{height: '100%'}} />}
          >
            <MarkerClusterer styles={this.myStyles}>
              {
                this.markerClusterer.map((position, index) => <Marker key={index} position={position} />) // eslint-disable-line react/no-array-index-key
              }
            </MarkerClusterer>
          </AsyncMap>
        </div>
      </div>
    );
  }
}
