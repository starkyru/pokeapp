import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { PokemonPage } from './features/pokemon/components/PokemonPage';
import { SearchHistory } from './features/Search/components/SearchHistory';
import { SearchPage } from './features/Search/components/SearchPage';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="container px-4 lg:px-6 py-1 lg:py-2 mx-auto flex-1">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-3xl"> {t('app-name')}</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center justify-center text-xl font-bold">
            <Link to="/" className="mr-10 hover:text-gray-900">
              {t('Home')}
            </Link>
            <Link to="/history" className="mr-5 hover:text-gray-900">
              {t('Search history')}
            </Link>
          </nav>
        </div>
      </header>
      <div className="bg-white p-2 md:p-8 rounded md:rounded-2xl">
        <Switch>
          <Route path="/pokemon/:pokemonName">
            <PokemonPage />
          </Route>
          <Route path="/history">
            <SearchHistory />
          </Route>
          <Route path="/">
            <SearchPage />
          </Route>
          <Route path="*">Not Found</Route>
        </Switch>
      </div>
    </main>
  );
};

export default App;
