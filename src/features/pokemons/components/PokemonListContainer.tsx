import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../components/Button';
import { StatusFetchWrapper } from '../../../components/FetchWrapper';
import type { RootState } from '../../../store';
import type { NamedAPIResource } from '../../../utils/models';
import type { RequestStatus } from '../../../utils/requestStatus';
import {
  filteredListSelector,
  getPokemonListStatus,
} from '../store/pokemonList/pokemonListSelectors';

import { PokemonList } from './PokemonList';

const ITEMS_PER_PAGE = 20;

const useStoreSearchString = () => {
  const storeSearchString = useSelector<RootState, string>(
    (state) => state.search.searchString,
  );

  const history = useHistory();

  useEffect(() => {
    if (storeSearchString) {
      // restore last search
      const params = new URLSearchParams({ search: storeSearchString });
      history.replace({
        pathname: '/',
        search: params.toString(),
      });
    }
  }, []);

  return storeSearchString;
};

const usePokemonSearch = (itemsPerPage: number = ITEMS_PER_PAGE) => {
  const [page, setPage] = useState<number>(1);

  const filteredList = useSelector<RootState, NamedAPIResource[]>((state) =>
    filteredListSelector(state),
  );

  // reset page on new filtered list
  useEffect(() => {
    setPage(1);
  }, [filteredList]);

  const visiblePokemon = useMemo(() => {
    return filteredList.slice(0, itemsPerPage * page);
  }, [page, filteredList]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);
  const showLoadMore = page * itemsPerPage < filteredList.length;
  return { loadMore, page, showLoadMore, visiblePokemon };
};

const usePokemonListStatus = () =>
  useSelector<RootState, RequestStatus>((state) => getPokemonListStatus(state));

export const PokemonListContainer: React.FC = memo(() => {
  const { t } = useTranslation();

  const storeSearchString = useStoreSearchString();
  const pokemonListStatus = usePokemonListStatus();

  const { loadMore, showLoadMore, visiblePokemon } = usePokemonSearch();

  return (
    <StatusFetchWrapper status={pokemonListStatus}>
      {storeSearchString && (
        <div className="m-2">
          {t('searchfor')}
          {storeSearchString}
        </div>
      )}
      {visiblePokemon ? <PokemonList list={visiblePokemon} /> : false}
      {showLoadMore && (
        <Button onClick={loadMore} title={t('loadmore')} className="m-2 px-6" />
      )}
    </StatusFetchWrapper>
  );
});
