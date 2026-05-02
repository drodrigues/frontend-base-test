import classNames from 'classnames';
import React, { ReactNode } from 'react';

import './index.scss';

interface Props {
  visible?: boolean;
  overlay?: boolean;
  fitToParent?: boolean;
  children?: ReactNode | null;
}

const Loading = ({ visible = true, overlay, fitToParent, children }: Props) => {
  if (!visible) return children || null;

  return (
    <div
      className={classNames('Loading', {
        'Loading--overlay': overlay,
        'Loading--fit-parent': fitToParent,
      })}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <span className="Loading__spinner" aria-hidden="true"></span>
    </div>
  );
};

export default Loading;
