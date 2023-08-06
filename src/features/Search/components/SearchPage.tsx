import React from 'react';

import { PokemonListContainer } from '../../pokemons/components/PokemonListContainer';

import { SearchField } from './SearchField';

export const SearchPage: React.FC = () => {
  return (
    <>
      <SearchField />
      <PokemonListContainer />
    </>
  );
};
