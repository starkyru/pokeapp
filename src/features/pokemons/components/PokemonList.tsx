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
    <div className="flex flex-row flex-wrap justify-center mt-4">
      {list.length ? (
        list.map((item) => <PokemonListItem name={item.name} key={item.name} />)
      ) : (
        <div className="text-2xl text-center ">{t('nothing-found')}</div>
      )}
    </div>
  );
};

export { PokemonList };
