import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { RootState } from '../../../store';
import type { NamedAPIResource } from '../../../utils/models';
import type { RequestStatus } from '../../../utils/requestStatus';
import {
  filteredListSelector,
  getPokemonListStatus,
} from '../store/pokemonList/pokemonListSelectors';

export const ITEMS_PER_PAGE = 20;

export const useStoreSearchString = () => {
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

export const usePokemonSearch = () => {
  return useSelector<RootState, NamedAPIResource[]>((state) =>
    filteredListSelector(state),
  );
};

export function useArrayPager<ListType>(
  list: ListType[],
  itemsPerPage: number = ITEMS_PER_PAGE,
) {
  const [page, setPage] = useState<number>(1);

  // reset page on new filtered list
  useEffect(() => {
    setPage(1);
  }, [list]);

  const visibleList = useMemo(() => {
    return list.slice(0, itemsPerPage * page);
  }, [page, list]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);
  const showLoadMore = page * itemsPerPage < list.length;
  return { loadMore, page, showLoadMore, visibleList };
}

export const usePokemonListStatus = () =>
  useSelector<RootState, RequestStatus>((state) => getPokemonListStatus(state));
