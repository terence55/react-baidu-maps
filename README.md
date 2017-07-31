# react-baidu-maps

## Features

- React components for Baidu Maps.
- Custom config supported.

## Installation

```bash
npm install react-baidu-maps --save
```
    
## Usage

### Getting Started

You need to obtain a Baidu Maps AK through [Baidu LBS Platform](http://lbsyun.baidu.com/apiconsole/key).

Then import Baidu Maps script into your `index.html`.

```html
<html>
  <head>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=input_your_key"></script>
  </head>
  <body>
  </body>
</html>
```

Use Baidu Maps statically:

```js
import { BaiduMap } from 'react-baidu-maps';
ReactDOM.render(
  <div style={{ background: '#444', height: '500px' }}>
    <BaiduMap mapContainer={<div style={{ height: '100%' }} />} />
  </div>, container);
```

Use Baidu Maps dynamically with asynchronous load:

```js
import { asyncWrapper } from 'react-baidu-maps';
const AsyncMap = asyncWrapper(BaiduMap);
ReactDOM.render(
  <div style={{ background: '#444', height: '500px' }}>
    <AsyncMap
      mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
      loadingElement={<div>Loading.....</div>}
      mapContainer={<div style={{ height: '100%' }} />} />
  </div>, container);
```

### Handle Events

All events are mapped to React props with name like 'on + {event name}'(e.g. tilesloaded => onTilesloaded, resize => onResize)，the first letter of event name should be capitalized.

```js
ReactDOM.render(
  <div style={{ background: '#444', height: '500px' }}>
    <BaiduMap
      mapContainer={<div style={{ height: '100%' }}
      onTilesloaded={...}
      onClick={...} />} />
  </div>, container);
```

### Overlays

All Baidu Maps overlays are supported.

### Marker

```js
<BaiduMap
  mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
  loadingElement={<div>Loading.....</div>}
  mapContainer={<div style={{ height: '100%' }} />} >
  <Marker position={{ lng: 116.404, lat: 39.915 }} />
</BaiduMap>
```

### Circle

```js
<Circle
  center={{ lng: 116.404, lat: 39.915 }}
  radius={500}
  strokeColor="red"
  strokeWeight={2} />
```

### Curve

```js
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
<Curve path={polygon} strokeWeight={2} strokeColor="red" />
```

### GroundOverlay

```js
<Ground
  bounds={{ sw: { lng: 116.424319, lat: 39.907408 }, ne: { lng: 116.442285, lat: 39.914714 } }}
  imageUrl="http://lbsyun.baidu.com/jsdemo/img/si-huan.png" />
```

### Label

```js
<Label
  position={{ lng: 116.365139, lat: 39.916595 }}
  content="Label Demo"
  offset={{ width: 30, height: -30 }} />
```

### Polygon

```js
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
<Polygon path={polygon} strokeWeight={2} />
```

### Polyline

```js
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
<Polyline path={polyline} strokeWeight={2} strokeColor="green" />
```

### Custom Overlay

```js
<Overlay
  constructorParams={...}
  customConstructor={...}
  initialize={...}
  draw={...} />
```

### MarkerClusterer
```js
const MAX = 30;
const markerClusterer = [];
for (let i = 0; i < MAX; i++) {
  markerClusterer.push({
    lng: (Math.random() * 40) + 85,
    lat: (Math.random() * 30) + 21
  });
}
    
<MarkerClusterer>
  {markerClusterer.map(position => <Marker position={position} />)}
</MarkerClusterer> 
```

### Controls

All Baidu Maps controls are supported.

### NavigationControl

```js
<BaiduMap
  mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
  loadingElement={<div>Loading.....</div>}
  mapContainer={<div style={{ height: '100%' }} />} >
  <NavigationControl
    type="small"
    anchor="top_right"
    offset={{ width: 0, height: 30 }} />
</BaiduMap>
```

### ScaleControl

```js
<ScaleControl />
```

### MapTypeControl

```js
<MapTypeControl  />
```

### OverviewMapControl

```js
<OverviewMapControl  />
```

### GeolocationControl

```js
<GeolocationControl
  onLocationSuccess={(e) => {
    let address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    console.warn(`Current Location: ${address}`);
  }} />
```

### CopyrightControl

```js
<CopyrightControl
  anchor="bottom_right"
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
    }]} />
```