import { memoize } from 'proxy-memoize';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  if (searchString.length > 0) {
    const filteredList = pokemonList.filter((item) =>
      item.name.includes(searchString),
    );
    return filteredList.length ? filteredList : EMPTY_LIST;
  }
  return pokemonList;
});

const ITEMS_PER_PAGE = 20;
export const PokemonListContainer: React.FC = memo(() => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);

  const filteredList = useSelector<RootState, NamedAPIResource[]>((state) =>
    filteredListSelector(state),
  );

  // reset page on new filtered list
  useEffect(() => {
    setPage(1);
  }, [filteredList]);

  const visiblePokemon = useMemo(() => {
    return filteredList.slice(0, ITEMS_PER_PAGE * page - 1);
  }, [page, filteredList]);

  const pokemonListStatus = useSelector<RootState, RequestStatus>((state) =>
    getPokemonListStatus(state),
  );

  const handleLoadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <StatusFetchWrapper status={pokemonListStatus}>
      {visiblePokemon ? <PokemonList list={visiblePokemon} /> : false}
      {page * ITEMS_PER_PAGE < filteredList.length && (
        <button onClick={handleLoadMore}>{t('Load More')}</button>
      )}
    </StatusFetchWrapper>
  );
});
