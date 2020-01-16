import React from 'react';
import {useParams} from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import config from './pageConfig';

function ContentComponent() {
  const {type} = useParams();
  const pageMap = {};
  config.forEach((item) => { pageMap[item.type] = item.comp; });
  if (pageMap[type] !== undefined) {
    return pageMap[type];
  }
  return (<div>Not Match</div>);
}

export default ContentComponent;
