import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { StatusFetchWrapper } from '../../../components/FetchWrapper';
import type { RootState } from '../../../store';
import { useAppDispatch } from '../../../store/storeHelpers';
import type { NamedAPIResource } from '../../../utils/models';
import type { RequestStatus } from '../../../utils/requestStatus';
import { useSearchQuery } from '../../Search/hooks/useSearchQuery';
import { search } from '../../Search/store/searchSlice';
import {
  filteredListSelector,
  getPokemonListStatus,
} from '../store/pokemonList/pokemonListSelectors';

import { PokemonList } from './PokemonList';

const ITEMS_PER_PAGE = 20;
export const PokemonListContainer: React.FC = memo(() => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);

  const filteredList = useSelector<RootState, NamedAPIResource[]>((state) =>
    filteredListSelector(state),
  );
  const searchString = useSearchQuery();
  const dispatch = useAppDispatch();

  // set search only on the page load
  useEffect(() => {
    if (searchString) {
      dispatch(search(searchString));
    }
  }, []);

  // reset page on new filtered list
  useEffect(() => {
    setPage(1);
  }, [filteredList]);

  const visiblePokemon = useMemo(() => {
    return filteredList.slice(0, ITEMS_PER_PAGE * page);
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
