import React from 'react';

export const PokemonListEmptyItem: React.FC = () => {
  return (
    <div className="flex flex-1 border-2 border-transparent w-full justify-center cursor-pointer">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex-[1_0_auto] bg-gray-200 rounded-2xl aspect-square min-w-[150px]"></div>
        <div className="text-2xl p-2 text-center flex-[1_1_auto]">&nbsp;</div>
      </div>
    </div>
  );
};
