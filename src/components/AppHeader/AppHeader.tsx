import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const AppHeader = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-3xl">{t('app-name')}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center justify-center text-xl font-bold">
          <Link
            to={`/${pathname === '/' ? 'search=' : ''}`}
            className="mr-10 hover:text-gray-900"
          >
            {t('Home')}
          </Link>
          <Link to="/history" className="mr-5 hover:text-gray-900">
            {t('Search history')}
          </Link>
        </nav>
      </div>
    </header>
  );
};
