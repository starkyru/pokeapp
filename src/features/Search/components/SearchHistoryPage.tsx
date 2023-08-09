import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';

import { Header } from '../../../components/Header';
import type { RootState } from '../../../store';

export const SearchHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useSelector<RootState, string[]>(
    (state) => state.search.history,
  );
  return (
    <>
      <Helmet>
        <title>Pokedex - Search History</title>
      </Helmet>
      <Header title={t('history')} />
      <section className="flex flex-col items-center pt-4">
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
      </section>
    </>
  );
};
