import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

import Application from './Application';

const container = document.createElement('div');
container.style.height = '100%';
container.style.width = '100%';
document.body.appendChild(container);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    container
  );
};

render(Application);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Application', () => {
    render(Application)
  });
}
