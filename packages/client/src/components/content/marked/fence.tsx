import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import hljs from '@comp/content/hljs';
import { Fence as FenceNode } from '@gilly/marker/dist/ast';

class Fence extends Component<{ node: FenceNode }, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hljs.highlightBlock(findDOMNode(this.refs.code) as Node);
  }

  render = () => {
    const { node } = this.props;
    const langClass = `${node.lang === '' ? 'nohighlight' : node.lang}`;
    return (
      <div className='marked-fence'>
        <pre>
          <code className={langClass} ref='code'>
            {node.value}
          </code>
        </pre>
      </div>
    );
  }
}

export default Fence;
