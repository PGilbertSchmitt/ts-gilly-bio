import React, { FunctionComponent as FC } from 'react';
import {
  BaseNode,
  BaseTypes,
} from '@gilly/marker/dist/ast';

interface BaseNodeProps {
  node: BaseNode;
  customClass: string;
  key: number;
}

export type BaseNodeComponent = FC<BaseNodeProps>;

// Should only return the FC<BaseNodeProps> type when complete
export const baseNodeToComponent = ({ node, customClass, key }: BaseNodeProps): (BaseNodeComponent | JSX.Element) => {
  switch (node.type) {
    case BaseTypes.heading:
    case BaseTypes.paragraph:
    case BaseTypes.fence:
    case BaseTypes.blockquote:
    case BaseTypes.bulletList:
    case BaseTypes.orderedList:
    case BaseTypes.table:
    case BaseTypes.horizontalRow:
    default:
      return (
        <p className={`marked-none ${customClass}`} key={key}>
          Component for {node.type} not yet implemented, fix it!
        </p>
      );
  }
};
