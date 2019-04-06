import React, { FunctionComponent as FC, ReactNode } from 'react';

import styles from '@styles/pagebase.scss';

interface IProps {
  children: ReactNode;
}

const PageBase: FC<IProps> = ({ children }) => (
  <div className={styles.pageBase}>
    {children}
  </div>
);

export default PageBase;
