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
    <Link
      className="flex flex-1 flex-col justify-between cursor-pointer"
      to={`/pokemon/${data.name}`}
    >
      <div className="flex-[1_0_auto] bg-gray-200 rounded-2xl aspect-square p-2 min-w-[150px]">
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
  );
};
