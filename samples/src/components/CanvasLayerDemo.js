import React from 'react';
import {BaiduMap, CanvasLayer} from 'react-baidu-maps';

const defaultZoom = 10;
const defaultCenter = {lng: 116.3964, lat: 39.9093};

export default class CanvasLayerDemo extends React.Component {
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
        <div style={{background: '#444', height: '500px'}}>
          <BaiduMap
            id='map1'
            ref={(instance) => this.map = instance}
            enableScrollWheelZoom
            enableDragging={this.state.enableDragging}
            defaultZoom={this.state.zoom}
            center={this.state.center}
            mapContainer={<div style={{height: '100%'}} />}
          >
            <CanvasLayer
              zIndex={10}
              update={(canvas) => {
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  return;
                }
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.fillStyle = 'rgba(50, 50, 255, 0.7)';
                ctx.beginPath();
                const data = [
                  new BMap.Point(116.297047, 39.979542), // eslint-disable-line no-undef
                  new BMap.Point(116.321768, 39.88748), // eslint-disable-line no-undef
                  new BMap.Point(116.494243, 39.956539) // eslint-disable-line no-undef
                ];
                for (let i = 0, len = data.length; i < len; i++) {
                  const pixel = this.map.getBMap().pointToPixel(data[i]);
                  ctx.fillRect(pixel.x, pixel.y, 30, 30);
                }
              }}
            />
          </BaiduMap>
        </div>
      </div>
    );
  }
}
