import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './translations/i18n';
import { PokemonListContainer } from './features/pokemons/components/PokemonListContainer';
import { SearchField } from './features/SearchField/SearchField';
import { Pokemon } from './features/pokemon/components/Pokemon';

const App: React.FC = () => {
  return (
    <main className="App">
      <header className="App-header">Pokedex</header>
      <Switch>
        <Route path="/pokemon/:pokemonName">
          <Pokemon />
        </Route>
        <Route path="/">
          <SearchField />
          <PokemonListContainer />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
