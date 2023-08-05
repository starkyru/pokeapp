import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../components/Button';
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
  const storeSearchString = useSelector<RootState, string>(
    (state) => state.search.searchString,
  );
  const searchString = useSearchQuery();
  const dispatch = useAppDispatch();
  const history = useHistory();

  // set search only on the page load
  // could be extracted
  useEffect(() => {
    if (searchString) {
      dispatch(search(searchString));
    }
    if (storeSearchString) {
      // restore last search
      const params = new URLSearchParams({ search: storeSearchString });
      history.replace({
        pathname: '/',
        search: params.toString(),
      });
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
      {storeSearchString && (
        <div className="m-2">
          {t('searchfor')}
          {storeSearchString}
        </div>
      )}
      {visiblePokemon ? <PokemonList list={visiblePokemon} /> : false}
      {page * ITEMS_PER_PAGE < filteredList.length && (
        <Button
          onClick={handleLoadMore}
          title={t('loadmore')}
          className="m-2 px-6"
        />
      )}
    </StatusFetchWrapper>
  );
});
