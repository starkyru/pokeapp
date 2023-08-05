import React from 'react';

import './App.css';
import './translations/i18n';
import { PokemonListContainer } from './features/pokemons/components/PokemonListContainer';
import { SearchField } from './features/SearchField/SearchField';

const App: React.FC = () => {
  return (
    <main className="App">
      <header className="App-header">
        <SearchField />
        <PokemonListContainer />
      </header>
    </main>
  );
};

export default App;
