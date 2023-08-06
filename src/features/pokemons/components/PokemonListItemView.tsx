import React from 'react';
import { Link } from 'react-router-dom';

import type { Pokemon } from '../../../utils/models';
import { formatName } from '../../../utils/string';

type PokemonListItemViewProps = {
  data: Pokemon;
};
export const PokemonListItemView: React.FC<PokemonListItemViewProps> = ({
  data,
}) => {
  return (
    <div className="flex w-full justify-center cursor-pointer">
      <Link
        className="flex flex-1 flex-col justify-between"
        to={`/pokemon/${data.name}`}
      >
        <div className="flex-[1_0_auto] bg-gray-200 rounded-2xl p-2">
          {data.sprites.front_default && (
            <img
              className="resize object-contain w-full flex-1"
              src={data.sprites.front_default}
              alt={`Default front image of ${data.name}`}
            />
          )}
        </div>
        <div className="text-2xl p-2 text-center whitespace-nowrap text-ellipsis flex-[0_1_auto]">
          {formatName(data.name) || <>&nbsp;</>}
        </div>
      </Link>
    </div>
  );
};
