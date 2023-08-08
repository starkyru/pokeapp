import React from 'react';

import { FetchWrapper } from '../../../components/FetchWrapper';
import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';

import { PokemonListEmptyItem } from './PokemonListEmptyItem';
import { PokemonListItemView } from './PokemonListItemView';

type PokemonListItemProps = {
  name: string;
};
const PokemonListItem: React.FC<PokemonListItemProps> = ({ name }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  return (
    <div className="flex flex-1 border-2 border-transparent hover:border-gray-200 rounded-2xl">
      <FetchWrapper
        isLoading={isLoading}
        isError={!!error}
        renderLoading={() => <PokemonListEmptyItem name={name} />}
      >
        {data ? (
          <PokemonListItemView data={data} />
        ) : (
          <PokemonListEmptyItem name={name} />
        )}
      </FetchWrapper>
    </div>
  );
};

export { PokemonListItem };
