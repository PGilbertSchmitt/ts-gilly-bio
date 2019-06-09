import { FunctionComponent as FC, createElement } from 'react';

import { mapSubNodes } from './sub_node';
import { Heading } from '@gilly/marker/dist/ast';

// Using createElement directly since the header level is dynamic (based on props)
const Header: FC<{ node: Heading }> = ({ node }) => createElement(
  `h${node.size}`,
  { className: `marked-h${node.size}` },
  mapSubNodes(node.parts),
);

export default Header;
