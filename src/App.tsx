import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { PokemonListContainer } from './features/pokemons/components/PokemonListContainer';
import { SearchField } from './features/SearchField/SearchField';

const App: React.FC = () => {
  return (
    <main className="App">
      <header className="App-header">
        <Switch>
          <Route path="/pokemon/:pokemonName">
            <div>pokemon</div>
          </Route>
          <Route path="/">
            <SearchField />
            <PokemonListContainer />
          </Route>
        </Switch>
      </header>
    </main>
  );
};

export default App;
