import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';

export const Pokemon: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        data && (
          <div>
            {data.name}
            {data.sprites.front_default && (
              <img src={data.sprites.front_default} />
            )}
          </div>
        )
      )}
    </div>
  );
};
