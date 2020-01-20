import React from 'react';
import SimpleDemo from './SimpleDemo';
import OverlayDemo from './OverlayDemo';
import AsyncDemo from './AsyncDemo';
import AsyncDemoV2 from './AsyncDemoV2';
import RestrictedDemo from './RestrictedDemo';
import ControlsDemo from './ControlsDemo';
import InfoWindowDemo from './InfoWindowDemo';
import CustomStyleDemo from './CustomStyleDemo';
import CustomStyleDemoV2 from './CustomStyleDemoV2';
import CanvasLayerDemo from './CanvasLayerDemo';

const config = [
  {
    type: 'simple',
    link: '/component/simple',
    comp: <SimpleDemo />
  },
  {
    type: 'overlays',
    link: '/component/overlays',
    comp: <OverlayDemo />
  },
  {
    type: 'async',
    link: '/component/async',
    comp: <AsyncDemo />
  },
  {
    type: 'restricted',
    link: '/component/restricted',
    comp: <RestrictedDemo />
  },
  {
    type: 'customstyle',
    link: '/component/customstyle',
    comp: <CustomStyleDemo />
  },
  {
    type: 'controls',
    link: '/component/controls',
    comp: <ControlsDemo />
  },
  {
    type: 'infowindow',
    link: '/component/infowindow',
    comp: <InfoWindowDemo />
  },
  {
    type: 'asyncv2',
    link: '/component/asyncv2',
    comp: <AsyncDemoV2 />
  },
  {
    type: 'customstylev2',
    link: '/component/customstylev2',
    comp: <CustomStyleDemoV2 />
  },
  {
    type: 'canvaslayer',
    link: '/component/canvaslayer',
    comp: <CanvasLayerDemo />
  }
];

export default config;
