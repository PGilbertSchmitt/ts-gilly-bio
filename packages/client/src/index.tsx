import React from 'react';
import { render } from 'react-dom';

import Root from '@comp/core/root';

const hooks = {};
const store = {
  val: 5,
  foo: 'bar',
};

const renderState = {
  frame: 0,
  dirty: true,
  invalidate: () => renderState.dirty = true,
};

const paint = () => {
  if (renderState.dirty) {
    console.log(`Painting frame ${renderState.frame}`);
    render(
      <Root
        hooks={hooks}
        store={store}
        refresh={renderState.invalidate} />,
      document.getElementById('root'),
    );
    renderState.dirty = false;
  }
};

const nextScreenTick = () => {
  paint();
  window.requestAnimationFrame(nextScreenTick);
};

window.onload = nextScreenTick;
