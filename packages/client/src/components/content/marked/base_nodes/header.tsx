import React, { FunctionComponent as FC, createElement } from 'react';

import { subNodeToComponent } from '../sub_nodes/_sub_node';
import { Heading } from '@gilly/marker/dist/ast';

// Using createElement directly since the header level is dynamic (based on props)
const Header: FC<{ node: Heading }> = ({ node }) => createElement(
  `h${node.size}`,
  { className: `marked-h${node.size}` },
  node.parts.map((subNode, key) => (
    subNodeToComponent(subNode, key)
  )),
);

export default Header;
