import React, { FunctionComponent as FC, createElement } from 'react';

import { mapSubNodes } from './sub_node';
import { Paragraph } from '@gilly/marker/dist/ast';

const Paragraph: FC<{ node: Paragraph }> = ({ node }) => (
  <p className='marked-p'>
    {mapSubNodes(node.parts)}
  </p>
);

export default Paragraph;
