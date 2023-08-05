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
    <div className="w-1/4 flex p-2 w-sm-1/2">
      <FetchWrapper isLoading={isLoading} isError={!!error}>
        {data && (
          <div className="bg-gray-200 rounded flex w-full justify-center  group-hover:bg-none  cursor-pointer">
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
              <div className="text-2xl p-2">{formatName(data.name)}</div>
            </Link>
          </div>
        )}
      </FetchWrapper>
    </div>
  );
};

export { PokemonListItem };
