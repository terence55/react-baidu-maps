import React from 'react';
import SimpleDemo from './SimpleDemo';
import OverlayDemo from './OverlayDemo';
import AsyncDemo from './AsyncDemo';
import RestrictedDemo from './RestrictedDemo';
import CustomStyleDemo from './CustomStyleDemo';
import ControlsDemo from './ControlsDemo';
import InfoWindowDemo from './InfoWindowDemo';
import SimpleDemoV3 from './SimpleDemoV3';

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
    type: 'simplev3',
    link: '/component/simplev3',
    comp: <SimpleDemoV3 />
  }
];

const pageMap = {};
config.forEach((item) => { pageMap[item.type] = item.comp; });

export default {
  config: config,
  pageMap: pageMap
};
