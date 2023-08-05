import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';

import type { RootState } from '../../../store';

export const SearchHistory: React.FC = () => {
  const { t } = useTranslation();
  const history = useSelector<RootState, string[]>(
    (state) => state.search.history,
  );
  return (
    <div>
      <h3>{t('Search history')}</h3>
      <div className="flex flex-col">
        {history && history.length
          ? history.map((item, index) => (
              <Link key={uid(item, index)} to={`/?search=${item}`}>
                {item}
              </Link>
            ))
          : t('Search history is empty')}
      </div>
    </div>
  );
};
