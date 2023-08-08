import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrayPager } from '../../../components/ArrayPager/ArrayPager';
import { StatusFetchWrapper } from '../../../components/FetchWrapper';
import {
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

  return (
    <StatusFetchWrapper status={pokemonListStatus}>
      {storeSearchString && (
        <div className="m-2 mt-6">
          {t('searchfor')}
          {storeSearchString}
        </div>
      )}
      <ArrayPager
        items={filteredList}
        renderItems={(list) => <PokemonList list={list} />}
        infinitiveScroll
      />
    </StatusFetchWrapper>
  );
});
