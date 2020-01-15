import React from 'react';
import {Link, useParams} from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import config from './pageConfig';

function MainComponent() {
  const {type} = useParams();
  return (
    <div>
      <h1>
        Maps-
        {type}
      </h1>
      <h4>
        {config.map((item) => (
          <span key={item.type}>
            <Link to={item.link}>{item.type}</Link>
            {' '}
|
            {' '}
          </span>
        ))}
      </h4>
    </div>
  );
}

export default MainComponent;
