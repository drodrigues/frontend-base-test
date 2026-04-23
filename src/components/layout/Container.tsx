import classNames from 'classnames';
import { ReactNode } from 'react';

import Loading from '@/components/loading';
import './Container.scss';

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  type?: 'header' | 'section' | 'aside' | 'footer' | 'main' | 'div';
  maxWidth?: 'default' | 'narrow';
  fullContent?: boolean;
  isLoading?: boolean;
  role?: string;
};

const LayoutContainer = ({
  id,
  children,
  className,
  contentClassName,
  type = 'section',
  fullContent = false,
  maxWidth = 'default',
  isLoading = false,
  role,
}: Props) => {
  const Component = type;

  return (
    <Component id={id} className={classNames('LayoutContainer', className)} role={role}>
      <div
        className={classNames(
          'LayoutContainer__content',
          {
            'LayoutContainer__content--narrow': !fullContent && maxWidth === 'narrow',
            'LayoutContainer__content--full': fullContent,
          },
          contentClassName,
        )}>
        {isLoading ? <Loading visible fitToParent /> : children}
      </div>
    </Component>
  );
};

export default LayoutContainer;
