import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../components/Button/Button';
import { useAppDispatch } from '../../../store/storeHelpers';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { search } from '../store/searchSlice';

export const SearchField: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const searchString = useSearchQuery();

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event?.target;
      const params = new URLSearchParams({ [name]: value });
      history.replace({
        pathname: '/',
        search: params.toString(),
      });
    },
    [],
  );
  const handleSearch = useCallback(() => {
    dispatch(search(searchString));
  }, [searchString]);

  return (
    <div className="flex justify-center">
      <input
        name="search"
        className="rounded-2xl"
        value={searchString}
        onChange={handleSearchChange}
      />
      <Button onClick={handleSearch} className="ml-2" title={t('search')} />
    </div>
  );
};