import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../../components/Button';
import { StatusFetchWrapper } from '../../../components/FetchWrapper';
import {
  useArrayPager,
  usePokemonListStatus,
  usePokemonSearch,
  useStoreSearchString,
} from '../hooks/pokemonHooks';

import { PokemonList } from './PokemonList';

export const PokemonListContainer: React.FC = memo(() => {
  const { t } = useTranslation();

  const storeSearchString = useStoreSearchString();
  const pokemonListStatus = usePokemonListStatus();

  const filteredList = usePokemonSearch();
  const { loadMore, showLoadMore, visibleList } = useArrayPager(filteredList);

  return (
    <StatusFetchWrapper status={pokemonListStatus}>
      {storeSearchString && (
        <div className="m-2">
          {t('searchfor')}
          {storeSearchString}
        </div>
      )}
      {visibleList ? <PokemonList list={visibleList} /> : false}
      {showLoadMore && (
        <Button onClick={loadMore} title={t('loadmore')} className="m-2 px-6" />
      )}
    </StatusFetchWrapper>
  );
});
