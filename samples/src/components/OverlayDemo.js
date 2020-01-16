import React from 'react';
import {BaiduMap, asyncWrapper, Marker, Circle, Polygon, Polyline, Rectangle, Label, Curve, Ground, MarkerClusterer, Overlay} from 'react-baidu-maps';
import {MAP_KEY} from '../config';

const AsyncMap = asyncWrapper(BaiduMap);

export default class OverlayDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15
    };
  }

  render() {
    const polygon = [
      {
        lng: 116.387112,
        lat: 39.920977
      },
      {
        lng: 116.394226,
        lat: 39.917988
      },
      {
        lng: 116.401772,
        lat: 39.921364
      },
      {
        lng: 116.41248,
        lat: 39.927893
      }
    ];
    const polyline = [
      {
        lng: 116.399,
        lat: 39.910
      },
      {
        lng: 116.405,
        lat: 39.920
      },
      {
        lng: 116.425,
        lat: 39.900
      }
    ];
    const polygonEditable = [
      {
        lng: 116.419863,
        lat: 39.932669
      },
      {
        lng: 116.428415,
        lat: 39.924259
      },
      {
        lng: 116.437686,
        lat: 39.91856
      },
      {
        lng: 116.442573,
        lat: 39.935546
      }
    ];
    const MAX = 30;
    const markerClusterer = [];
    for (let i = 0; i < MAX; i++) {
      markerClusterer.push({
        lng: (Math.random() * 40) + 85,
        lat: (Math.random() * 30) + 21
      });
    }
    const txt = '银湖海岸城';
    const mouseoverTxt = `${txt} ${parseInt(Math.random() * 1000)}套`;
    return (
      <div>
        <div style={{background: '#444', height: '500px'}}>
          <AsyncMap
            mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
            loadingElement={<div>Loading.....</div>}
            id='asyncmap'
            enableScrollWheelZoom
            enableDragging
            zoom={this.state.zoom}
            mapContainer={<div style={{height: '100%'}} />}
          >
            <Marker position={{lng: 116.404, lat: 39.915}} />
            <Marker position={{lng: 116.424175, lat: 39.923568}} animation='bounce' />
            <Marker
              position={{lng: 116.380985, lat: 39.905914}}
              icon={{imageUrl: 'http://lbsyun.baidu.com/jsdemo/img/fox.gif', size: {width: 300, height: 171}}}
            />
            <Marker position={{lng: 116.380338, lat: 39.922184}} enableDragging label={{content: 'I\'m draggable.', offset: {width: 0, height: -16}}} />
            <Circle center={{lng: 116.404, lat: 39.915}} radius={500} strokeColor='red' strokeWeight={2} />
            <Polygon path={polygon} strokeWeight={2} />
            <Polygon path={polygonEditable} strokeWeight={2} enableEditing />
            <Polyline path={polyline} strokeWeight={2} strokeColor='green' />
            <Rectangle bounds={{sw: {lng: 116.392214, lat: 39.911901}, ne: {lng: 116.41478, lat: 39.918985}}} strokeWeight={2} strokeColor='yellow' />
            <Label position={{lng: 116.365139, lat: 39.916595}} content='Label Demo' offset={{width: 30, height: -30}} />
            <Curve path={polygon} strokeWeight={2} strokeColor='red' />
            <Ground bounds={{sw: {lng: 116.424319, lat: 39.907408}, ne: {lng: 116.442285, lat: 39.914714}}} imageUrl='http://lbsyun.baidu.com/jsdemo/img/si-huan.png' />
            <MarkerClusterer>
              {
                markerClusterer.map((position, index) => <Marker key={index} position={position} />) // eslint-disable-line react/no-array-index-key
              }
            </MarkerClusterer>
            <Overlay
              constructorParams={{
                point: {
                  lng: 116.407845,
                  lat: 39.914101
                },
                text: '银湖海岸城',
                mouseoverText: mouseoverTxt
              }}
              customConstructor={(self, params) => {
                console.warn('constructor');
                self.point = new BMap.Point(params.point.lng, params.point.lat); // eslint-disable-line no-undef
                self.text = params.text;
                self.overText = params.mouseoverText;
              }}
              initialize={(self, map) => {
                console.warn('initialize', self.point, self.text);
                self.map = map;
                const div = document.createElement('div');
                self.div = div;
                div.style.position = 'absolute';
                div.style.zIndex = BMap.Overlay.getZIndex(self.point.lat); // eslint-disable-line no-undef
                div.style.backgroundColor = '#EE5D5B';
                div.style.border = '1px solid #BC3B3A';
                div.style.color = 'white';
                div.style.height = '18px';
                div.style.padding = '2px';
                div.style.lineHeight = '18px';
                div.style.whiteSpace = 'nowrap';
                div.style.MozUserSelect = 'none';
                div.style.fontSize = '12px';
                const span = document.createElement('span');
                self.span = span;
                div.appendChild(span);
                span.appendChild(document.createTextNode(self.text));
                const that = self;

                const arrow = document.createElement('div');
                self.arrow = arrow;
                arrow.style.background = 'url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat';
                arrow.style.position = 'absolute';
                arrow.style.width = '11px';
                arrow.style.height = '10px';
                arrow.style.top = '22px';
                arrow.style.left = '10px';
                arrow.style.overflow = 'hidden';
                div.appendChild(arrow);

                div.onmouseover = function() {
                  this.style.backgroundColor = '#6BADCA';
                  this.style.borderColor = '#0000ff';
                  this.getElementsByTagName('span')[0].innerHTML = that.overText;
                  arrow.style.backgroundPosition = '0px -20px';
                };

                div.onmouseout = function() {
                  this.style.backgroundColor = '#EE5D5B';
                  this.style.borderColor = '#BC3B3A';
                  this.getElementsByTagName('span')[0].innerHTML = that.text;
                  arrow.style.backgroundPosition = '0px 0px';
                };

                map.getPanes().labelPane.appendChild(div);
                return div;
              }}
              draw={(self) => {
                console.warn('draw');
                const map = self.map;
                const pixel = map.pointToOverlayPixel(self.point);
                self.div.style.left = `${pixel.x - parseInt(self.arrow.style.left)}px`;
                self.div.style.top = `${pixel.y - 30}px`;
              }}
            />
          </AsyncMap>
        </div>
      </div>
    );
  }
}
