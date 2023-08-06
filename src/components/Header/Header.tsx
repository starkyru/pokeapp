import cn from 'classnames';
import React, { memo } from 'react';
interface HeaderProps {
  title: string;
  align?: 'left' | 'right' | 'center';
}
const STYLE_MAP: Record<Required<HeaderProps>['align'], string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
};
export const Header: React.FC<HeaderProps> = memo(
  ({ title, align = 'center' }) => {
    return (
      <h1 className={cn('px-5 py-2  font-bold text-3xl', STYLE_MAP[align])}>
        {title}
      </h1>
    );
  },
);
