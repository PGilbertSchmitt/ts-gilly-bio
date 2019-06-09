import React, { FunctionComponent as FC } from 'react';

import {
  MarkdownDoc,
} from '@gilly/marker/dist/ast';

import { baseNodeToComponent } from './base_node';

/* Presentational component for rendering Markdown converted into json by @gilly/marker package */

interface OwnProps {
  // Used to style it based on the context
  customClass: string;

  // The source from which it builds the article
  src: MarkdownDoc;
}

const Marked: FC<OwnProps> = ({ customClass, src }) => {
  return (
    <div className={`marked ${customClass}`}>
      {
        src.map((node, key) => (
          baseNodeToComponent(node, key)
        ))
      }
    </div>
  );
};

export default Marked;
