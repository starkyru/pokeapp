import React, { memo } from 'react';

interface HeaderProps {
  title: string;
}
export const Header: React.FC<HeaderProps> = memo(({ title }) => {
  return (
    <h1 className={'px-5 py-2 text-center font-bold text-3xl'}>{title}</h1>
  );
});
