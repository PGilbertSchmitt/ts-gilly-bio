import React, { FunctionComponent as FC } from 'react';
import {
  SubNode,
  SubTypes,
} from '@gilly/marker/dist/ast';

const subNodeToComponent = (
  node: SubNode,
): (FC<{ node: SubNode }>) => {
  switch (node.type) {
    case SubTypes.text:
      return () => <span className='marked-text-part'>{node.value}</span>;
    case SubTypes.strong:
      return () => <b>{mapSubNodes(node.parts)}</b>;
    case SubTypes.emphasis:
      return () => <em>{mapSubNodes(node.parts)}</em>;
    case SubTypes.strikethrough:
      return () => <s>{mapSubNodes(node.parts)}</s>;
    case SubTypes.link:
      return () => <a href={node.dest} title={node.title}>{mapSubNodes(node.parts)}</a>;
    case SubTypes.image:
      return () => <img src={node.src} alt={node.alt} title={node.title} />;
    case SubTypes.codeInline:
      return () => <span className='marked-code'>{node.value}</span>;
    case SubTypes.softbreak:
      return () => (<> </>);
    case SubTypes.hardbreak:
      return () => <br />;
  }
};

export const mapSubNodes = (nodes: SubNode[]) => (
  nodes.map((node, key) => {
    const NodeComponent = subNodeToComponent(node);
    return (
      <NodeComponent node={node} key={key} />
    );
  })
);
