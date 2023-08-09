import React from 'react';

type PokemonPanelProps = React.PropsWithChildren<{
  isVisible: boolean;
  title: string;
}>;
export const PokemonPanel: React.FC<PokemonPanelProps> = ({
  isVisible,
  title,
  children,
}) => {
  return isVisible ? (
    <section className="py-2">
      <div className="font-bold pr-2 ">{title}</div>
      <div className="pl-4">{children}</div>
    </section>
  ) : null;
};
