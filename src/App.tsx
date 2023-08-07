import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { AppHeader } from './components/AppHeader/AppHeader';
import { PokemonPage } from './features/pokemon/components/PokemonPage';
import { SearchHistory } from './features/Search/components/SearchHistory';
import { SearchPage } from './features/Search/components/SearchPage';

const App: React.FC = () => {
  return (
    <main className="container px-4 lg:px-6 py-1 lg:py-2 mx-auto flex-1">
      <AppHeader />
      <div className="bg-white p-2 py-6 md:p-8 rounded md:rounded-2xl">
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
