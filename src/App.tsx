import React, { useCallback, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { FetchWrapper } from './components/FetchWrapper';
import { PokemonList } from './features/pokemons/components/PokemonList';
import type { RootState } from './store';
import type { NamedAPIResource } from './utils/models';
import type { RequestStatus } from './utils/requestStatus';
import { isRequestFailed, isRequestInProgress } from './utils/requestStatus';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  // const { data, error, isLoading } = useGetPokemonByNameQuery(search);
  const [filteredList, setFilteredList] = useState<NamedAPIResource[]>([]);
  const { pokemonList, pokemonListStatus } = useSelector<RootState>((state) => {
    return {
      pokemonList: state.pokemonList.list,
      pokemonListStatus: state.pokemonList.status,
    };
  }) as { pokemonList: NamedAPIResource[]; pokemonListStatus: RequestStatus };
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(() => event.target.value);
    },
    [],
  );
  const handleSearch = useCallback(() => {
    setFilteredList(pokemonList.filter((item) => item.name.includes(search)));
  }, [search, pokemonList]);

  return (
    <main className="App">
      <header className="App-header">
        <div>
          <input name="search" value={search} onChange={handleSearchChange} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <FetchWrapper
          isLoading={isRequestInProgress(pokemonListStatus)}
          isError={isRequestFailed(pokemonListStatus)}
        >
          {filteredList ? <PokemonList list={filteredList} /> : false}
        </FetchWrapper>
      </header>
    </main>
  );
};

export default App;
