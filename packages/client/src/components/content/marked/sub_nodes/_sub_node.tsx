import React, { FunctionComponent as FC } from 'react';
import {
  SubNode,
  SubTypes,
} from '@gilly/marker/dist/ast';

import Text from './text';

// Should only return the FC<BaseNodeProps> type when complete
export const subNodeToComponent = (
  node: SubNode,
  key: number,
): (FC<{ node: SubNode }> | JSX.Element) => {
  switch (node.type) {
    case SubTypes.text:
      return <Text node={node} key={key} />;
    default:
      return (
        <span className='marked-part-none' key={key}>
          Sub component for {node.type} not yet implemented, get on it!
        </span>
      );
  }
};
