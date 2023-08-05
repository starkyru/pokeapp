import React from 'react';
import { Link } from 'react-router-dom';

import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';
import { capitalizeFirstLetter } from '../../../utils/string';

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
          <div className="bg-gray-200 rounded flex w-full justify-center  hover:bg-none  cursor-pointer">
            <Link
              className="flex flex-col justify-between"
              to={`/pokemon/${data.name}`}
            >
              {data.sprites.front_default && (
                <img
                  className="resize object-contain w-full flex-1"
                  src={data.sprites.front_default}
                />
              )}
              <div className="text-2xl p-2">
                {capitalizeFirstLetter(data.name)}
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export { PokemonListItem };
