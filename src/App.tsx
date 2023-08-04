import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { StatusFetchWrapper } from './components/FetchWrapper';
import { PokemonList } from './features/pokemons/components/PokemonList';
import { SearchField } from './features/SearchField/SearchField';
import type { RootState } from './store';
import type { NamedAPIResource } from './utils/models';
import type { RequestStatus } from './utils/requestStatus';

const App: React.FC = () => {
  const { filteredList, pokemonListStatus } = useSelector<RootState>(
    (state) => {
      return {
        filteredList:
          state.searchField.searchString.length > 1
            ? state.pokemonList.list.filter((item) =>
                item.name.includes(state.searchField.searchString),
              )
            : [],
        pokemonListStatus: state.pokemonList.status,
      };
    },
  ) as {
    filteredList: NamedAPIResource[];
    pokemonListStatus: RequestStatus;
  };

  return (
    <main className="App">
      <header className="App-header">
        <SearchField />
        <StatusFetchWrapper status={pokemonListStatus}>
          {filteredList ? <PokemonList list={filteredList} /> : false}
        </StatusFetchWrapper>
      </header>
    </main>
  );
};

export default App;
