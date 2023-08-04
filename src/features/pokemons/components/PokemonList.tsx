import React from 'react';
import { useTranslation } from 'react-i18next';

import type { NamedAPIResource } from '../../../utils/models';

import { PokemonListItem } from './PokemonListItem';

type PokemonListProps = {
  list: NamedAPIResource[];
};
const PokemonList: React.FC<PokemonListProps> = ({ list }) => {
  const { t } = useTranslation();
  return (
    <div>
      {list.length
        ? list.map((item) => (
            <PokemonListItem name={item.name} key={item.name} />
          ))
        : t('Nothing found')}
    </div>
  );
};

export { PokemonList };
