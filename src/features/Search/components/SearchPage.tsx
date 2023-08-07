import React from 'react';
import { Helmet } from 'react-helmet';

import { PokemonListContainer } from '../../pokemons/components/PokemonListContainer';

import { SearchField } from './SearchField';

export const SearchPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pokedex - Home Page</title>
      </Helmet>
      <SearchField />
      <PokemonListContainer />
    </>
  );
};
