import React from 'react';
import { useTranslation } from 'react-i18next';

import { useArrayPager } from '../../features/pokemons/hooks/pokemonHooks';
import { Button } from '../Button';
import { ViewObserver } from '../ViewObserver';

type ArrayPagerProps<Item> = {
  itemsPerPage?: number;
  items: Item[];
  renderItems: (items: Item[]) => React.ReactNode;
  infinitiveScroll?: boolean;
};
export function ArrayPager<Item>({
  items,
  itemsPerPage,
  renderItems,
  infinitiveScroll = false,
}: ArrayPagerProps<Item>) {
  const { t } = useTranslation();
  const { loadMore, showLoadMore, visibleList } = useArrayPager(
    items,
    itemsPerPage,
  );
  return (
    <>
      {visibleList ? renderItems(visibleList) : false}
      {infinitiveScroll ? (
        <ViewObserver callback={loadMore} />
      ) : (
        showLoadMore && (
          <Button
            onClick={loadMore}
            title={t('loadmore')}
            className="m-2 mt-4 px-6"
          />
        )
      )}
    </>
  );
}
