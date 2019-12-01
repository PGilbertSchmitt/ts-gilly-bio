import React, { FunctionComponent as FC } from 'react';
import {
  BaseNode,
  BaseTypes,
} from '@gilly/marker/dist/ast';

import Header from './header';
import Paragraph from './paragraph';
import Fence from './fence';
import List from './list';
import Table from './table';
import Blockquote from './blockquote';

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

    case BaseTypes.fence:
      return <Fence node={node} key={key} />;

    case BaseTypes.blockquote:
      return <Blockquote node={node} />;

    case BaseTypes.bulletList:
    case BaseTypes.orderedList:
      return <List node={node} key={key} />;

    case BaseTypes.table:
      return <Table node={node} />;

    case BaseTypes.horizontalRow:
      return <hr key={key} />;
  }
};
