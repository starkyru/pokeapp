import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/storeHelpers';

import { search } from './searchFieldSlice';

export const SearchField: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState('');

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(() => event.target.value);
    },
    [],
  );
  const handleSearch = useCallback(() => {
    dispatch(search(searchString));
  }, [searchString]);

  return (
    <div>
      <input name="search" value={searchString} onChange={handleSearchChange} />
      <button onClick={handleSearch}>{t('search')}</button>
    </div>
  );
};
