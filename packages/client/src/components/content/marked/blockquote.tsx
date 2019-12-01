import React, { FunctionComponent as FC } from 'react';

import { mapSubNodes } from './sub_node';
import { Blockquote } from '@gilly/marker/dist/ast';

const Blockquote: FC<{ node: Blockquote }> = ({ node }) => (
  <q className='marked-q'>
    {mapSubNodes(node.parts)}
  </q>
);

export default Blockquote;
