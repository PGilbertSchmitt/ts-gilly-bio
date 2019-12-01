import React, { FunctionComponent as FC, createElement } from 'react';

import { BaseTypes, BulletList, OrderedList } from '@gilly/marker/dist/ast';
import { baseNodeToComponent } from './base_node';

// Using createElement directly since the list type is dynamic (based on node.type). Both lists are identical internally
const List: FC<{ node: BulletList | OrderedList }> = ({ node }) => {
  const elementType = node.type === BaseTypes.bulletList ? 'ul' : 'ol';
  return createElement(
    elementType,
    { className: `marked-${elementType}` },
    node.list.map((listItems, i) => (
      <li key={i}>
        {listItems.map((listItem, j) => (
          baseNodeToComponent(listItem, j)
        ))}
      </li>
    ))
  );
};

export default List;
