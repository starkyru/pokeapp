import React from 'react';
import { Link } from 'react-router-dom';

import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';

type PokemonListItemProps = {
  name: string;
};
const PokemonListItem: React.FC<PokemonListItemProps> = ({ name }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  return (
    <div className="w-1/4 flex p-2 w-sm-1/2">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        data && (
          <div className="bg-blue-300 rounded flex w-full justify-center hover:bg-none  cursor-pointer">
            <Link className="flex" to={`/pokemon/${data.name}`}>
              <div>
                {data.name}
                {data.sprites.front_default && (
                  <img src={data.sprites.front_default} />
                )}
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export { PokemonListItem };
