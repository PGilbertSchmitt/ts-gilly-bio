// This global object is only used in the index file, but can (RE: should only) be modified by the invalidate
// hook, which allows any component to cause the react dom to rerender. Thanks StoneCypher!

const renderState = {
  frame: 0,
  dirty: true,
};

export const refresh = () => renderState.dirty = true;
export default renderState;

// DELETE
(window as any).tick = refresh;
