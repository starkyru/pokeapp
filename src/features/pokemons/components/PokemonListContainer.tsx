import { memoize } from 'proxy-memoize';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { StatusFetchWrapper } from '../../../components/FetchWrapper';
import type { RootState } from '../../../store';
import type { NamedAPIResource } from '../../../utils/models';
import type { RequestStatus } from '../../../utils/requestStatus';

import { PokemonList } from './PokemonList';

const EMPTY_LIST: NamedAPIResource[] = [];
const getPokemonListStatus = (state: RootState) => state.pokemonList.status;
const getPokemonList = (state: RootState) => state.pokemonList.list;
const getSearchString = (state: RootState) => state.searchField.searchString;

const filteredListSelector = memoize((state: RootState) => {
  const pokemonList = getPokemonList(state);
  const searchString = getSearchString(state);
  if (searchString.length > 1) {
    const filteredList = pokemonList.filter((item) =>
      item.name.includes(searchString),
    );
    return filteredList.length ? filteredList : EMPTY_LIST;
  }
  return EMPTY_LIST;
});

export const PokemonListContainer: React.FC = memo(() => {
  const filteredList = useSelector<RootState, NamedAPIResource[]>((state) =>
    filteredListSelector(state),
  );

  const pokemonListStatus = useSelector<RootState, RequestStatus>((state) =>
    getPokemonListStatus(state),
  );

  return (
    <StatusFetchWrapper status={pokemonListStatus}>
      {filteredList ? <PokemonList list={filteredList} /> : false}
    </StatusFetchWrapper>
  );
});
