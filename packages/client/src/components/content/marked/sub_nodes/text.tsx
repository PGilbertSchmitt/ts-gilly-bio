import React, { FunctionComponent as FC } from 'react';

import { Text } from '@gilly/marker/dist/ast';

const TextPart: FC<{ node: Text }> = ({ node }) => (
  <span className='marked-text-part'>{node.value}</span>
);

export default TextPart;
