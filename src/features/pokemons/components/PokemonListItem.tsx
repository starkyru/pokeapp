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
    <div className="w-1/2 flex p-4 md:w-1/4 lg:w-1/6 hover:border-2 hover:p-2 rounded-2xl">
      <FetchWrapper
        isLoading={isLoading}
        isError={!!error}
        LoadingComponent={PokemonListEmptyItem}
      >
        {data ? <PokemonListItemView data={data} /> : <PokemonListEmptyItem />}
      </FetchWrapper>
    </div>
  );
};

export { PokemonListItem };
