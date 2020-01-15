import React from 'react';
import SimpleDemo from './SimpleDemo';
import OverlayDemo from './OverlayDemo';
import AsyncDemo from './AsyncDemo';
import RestrictedDemo from './RestrictedDemo';
import CustomStyleDemoV2 from './CustomStyleDemoV2';
import ControlsDemo from './ControlsDemo';
import InfoWindowDemo from './InfoWindowDemo';
import CustomStyleDemo from './CustomStyleDemo';

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
    type: 'customstylev2',
    link: '/component/customstylev2',
    comp: <CustomStyleDemoV2 />
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
    type: 'customstylev3',
    link: '/component/customstylev3',
    comp: <CustomStyleDemo />
  }
];

export default config;
