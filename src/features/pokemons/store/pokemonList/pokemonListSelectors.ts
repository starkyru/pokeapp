import { memoize } from 'proxy-memoize';

import type { RootState } from '../../../../store';
import type { NamedAPIResource } from '../../../../utils/models';
import { getSearchString } from '../../../Search/store/searchSelectors';

export const getPokemonListStatus = (state: RootState) =>
  state.pokemonList.status;
export const getPokemonList = (state: RootState) => state.pokemonList.list;

const EMPTY_LIST: NamedAPIResource[] = [];

export const filterPokemonList = (
  pokemonList: NamedAPIResource[],
  searchString: string,
) => {
  if (searchString.length > 0) {
    const filteredList = pokemonList.filter((item) =>
      item.name.includes(searchString),
    );
    return filteredList.length ? filteredList : EMPTY_LIST;
  }
  return pokemonList;
};
export const filteredListSelector = memoize((state: RootState) => {
  const pokemonList = getPokemonList(state);
  const searchString = getSearchString(state);
  return filterPokemonList(pokemonList, searchString);
});
