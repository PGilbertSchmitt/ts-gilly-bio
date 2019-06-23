import React from 'react';
import { render } from 'react-dom';

import Root from '@comp/core/root';
import {
  store,
} from './store/root_state';
import renderState from '@util/render_state';

const paint = () => {
  if (renderState.dirty) {
    console.log(`Painting frame ${renderState.frame}`);
    render(
      <Root store={store} />,
      document.getElementById('root'),
    );
    renderState.dirty = false;
    renderState.frame++;
  }
};

const nextScreenTick = () => {
  paint();
  window.requestAnimationFrame(nextScreenTick);
};

window.onload = nextScreenTick;
