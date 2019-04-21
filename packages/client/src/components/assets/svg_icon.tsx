import React, { FunctionComponent as FC } from 'react';

import styles from '@styles/icons.scss';

interface IconProps {
  width: number;
  height: number;
}

// Github Icons

const ghIconMap = {
  commit: styles.commitIcon,
  merge: styles.mergeIcon,
};

interface GhIconProps extends IconProps {
  icon: keyof typeof ghIconMap;
}

export const GhIcon: FC<GhIconProps> = ({
  icon,
  width,
  height,
}) => {
  const classes = `${styles.icon} ${ghIconMap[icon]}`;

  const calculatedStyles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <i
      className={classes}
      style={calculatedStyles}
    />
  );
};
