import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { AppHeader } from './components/AppHeader/AppHeader';
import { PokemonPage } from './features/pokemon/components/PokemonPage';
import { SearchHistoryPage } from './features/Search/components/SearchHistoryPage';
import { SearchPage } from './features/Search/components/SearchPage';

const App: React.FC = () => {
  return (
    <main className="container px-4 lg:px-6 py-1 lg:py-2 mx-auto flex-1">
      <Helmet>
        <title>Pokedex</title>
      </Helmet>
      <AppHeader />
      <section className="bg-white p-2 py-6 md:p-8 rounded md:rounded-2xl flex flex-1 flex-col items-center">
        <Switch>
          <Route path="/pokemon/:pokemonName">
            <PokemonPage />
          </Route>
          <Route path="/history">
            <SearchHistoryPage />
          </Route>
          <Route path="/">
            <SearchPage />
          </Route>
          <Route path="*">Not Found</Route>
        </Switch>
      </section>
    </main>
  );
};

export default App;
