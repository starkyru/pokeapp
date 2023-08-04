import React from 'react';

import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';

type PokemonListItemProps = {
  name: string;
};
const PokemonListItem: React.FC<PokemonListItemProps> = ({ name }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        data.name
      ) : (
        false
      )}
    </div>
  );
};

export { PokemonListItem };
