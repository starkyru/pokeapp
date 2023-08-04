import React from 'react';

import type { NamedAPIResource } from '../../../utils/models';

import { PokemonListItem } from './PokemonListItem';

type PokemonListProps = {
  list: NamedAPIResource[];
};
const PokemonList: React.FC<PokemonListProps> = ({ list }) => {
  return (
    <div>
      {list.length
        ? list.map((item) => (
            <PokemonListItem name={item.name} key={item.name} />
          ))
        : 'Nothing found'}
    </div>
  );
};

export { PokemonList };
