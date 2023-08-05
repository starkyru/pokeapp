import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';

import { Header } from '../../../components/Header';
import type { RootState } from '../../../store';

export const SearchHistory: React.FC = () => {
  const { t } = useTranslation();
  const history = useSelector<RootState, string[]>(
    (state) => state.search.history,
  );
  return (
    <div>
      <Header title={t('history')} />
      <div className="flex flex-col items-center pt-4">
        {history && history.length
          ? history.map((item, index) => (
              <Link
                key={uid(item, index)}
                to={`/?search=${item}`}
                className="p-2"
              >
                {item}
              </Link>
            ))
          : t('history-empty')}
      </div>
    </div>
  );
};
