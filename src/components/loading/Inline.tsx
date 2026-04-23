import React, { JSX } from 'react';

import './Inline.scss';

type Props = {
  visible?: boolean;
};

const LoadingInline = ({ visible }: Props): JSX.Element | null => {
  if (!visible) return null;

  return (
    <div className='LoadingInline'>
      <div className='LoadingInline__progress' />
    </div>
  );
};

export default LoadingInline;
