import React, { JSX } from 'react';

import './Inline.scss';

type Props = {
  visible?: boolean;
};

const LoadingInline = ({ visible }: Props): JSX.Element | null => {
  if (!visible) return null;

  return (
    <span className="LoadingInline">
      <span className="LoadingInline__progress" />
    </span>
  );
};

export default LoadingInline;
