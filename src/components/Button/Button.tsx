import cn from 'classnames';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import React, { memo } from 'react';
interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'children'
  > {
  title: string;
}
export const Button: React.FC<ButtonProps> = memo(
  ({ title, className, ...rest }) => {
    return (
      <button
        className={cn('bg-gray-400 rounded-2xl px-3 py-2', className)}
        {...rest}
      >
        {title}
      </button>
    );
  },
);
