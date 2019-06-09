import React, { FunctionComponent as FC } from 'react';
import {
  BaseNode,
  BaseTypes,
} from '@gilly/marker/dist/ast';

import Header from './header';
import Paragraph from './paragraph';

// Should only return the FC<BaseNodeProps> type when complete
export const baseNodeToComponent = (
  node: BaseNode,
  key: number,
): (JSX.Element) => {
  switch (node.type) {
    case BaseTypes.heading:
      return <Header node={node} key={key} />;
    case BaseTypes.paragraph:
      return <Paragraph node={node} key={key} />;
    // case BaseTypes.fence:
    // case BaseTypes.blockquote:
    // case BaseTypes.bulletList:
    // case BaseTypes.orderedList:
    // case BaseTypes.table:
    case BaseTypes.horizontalRow:
      return <hr key={key} />;
    default:
      return (
        <p className='marked-none' key={key}>
          Component for {node.type} not yet implemented, fix it!
        </p>
      );
  }
};
