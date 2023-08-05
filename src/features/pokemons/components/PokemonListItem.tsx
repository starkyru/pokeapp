import React from 'react';
import { Link } from 'react-router-dom';

import { FetchWrapper } from '../../../components/FetchWrapper';
import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';
import { formatName } from '../../../utils/string';

type PokemonListItemProps = {
  name: string;
};
const PokemonListItem: React.FC<PokemonListItemProps> = ({ name }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  return (
    <div className="w-1/2 flex p-4 md:w-1/4 lg:w-1/6 hover:border-2 hover:p-2 rounded-2xl">
      <FetchWrapper isLoading={isLoading} isError={!!error}>
        {data && (
          <div className="flex w-full justify-center cursor-pointer">
            <Link
              className="flex flex-1 flex-col justify-between"
              to={`/pokemon/${data.name}`}
            >
              <div className="w-full bg-gray-200 rounded-2xl">
                {data.sprites.front_default && (
                  <img
                    className="resize object-contain w-full flex-1"
                    src={data.sprites.front_default}
                    alt={`Default front image of ${data.name}`}
                  />
                )}
              </div>
              <div className="text-2xl p-2 text-center">
                {formatName(data.name)}
              </div>
            </Link>
          </div>
        )}
      </FetchWrapper>
    </div>
  );
};

export { PokemonListItem };
