import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { Pokemon } from './features/pokemon/components/Pokemon';
import { Search } from './features/Search/components/Search';
import { SearchHistory } from './features/Search/components/SearchHistory';

import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="container px-5 py-2 mx-auto">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl"> {t('app-name')}</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-5 hover:text-gray-900">
              {t('Home')}
            </Link>
            <Link to="/history" className="mr-5 hover:text-gray-900">
              {t('Search history')}
            </Link>
          </nav>
        </div>
      </header>

      <Switch>
        <Route path="/pokemon/:pokemonName">
          <Pokemon />
        </Route>
        <Route path="/history">
          <SearchHistory />
        </Route>
        <Route path="/">
          <Search />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </main>
  );
};

export default App;
