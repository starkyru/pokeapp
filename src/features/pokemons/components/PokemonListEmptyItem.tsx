import React from 'react';

import { formatName } from '../../../utils/string';

type PokemonListEmptyItemProps = {
  name?: string;
};
export const PokemonListEmptyItem: React.FC<PokemonListEmptyItemProps> = ({
  name = '',
}) => {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex-[1_0_auto] bg-gray-200 rounded-2xl aspect-square min-w-[150px]"></div>
      <div className="text-2xl p-2 text-center whitespace-nowrap text-ellipsis flex-[0_1_auto]">
        {formatName(name) || <>&nbsp;</>}
      </div>
    </div>
  );
};
