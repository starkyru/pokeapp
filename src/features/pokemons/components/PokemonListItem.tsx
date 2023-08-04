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
        <div>
          {data.name}
          {data.sprites.front_default && (
            <img src={data.sprites.front_default} />
          )}
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export { PokemonListItem };
