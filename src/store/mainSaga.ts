import { fork } from 'redux-saga/effects';

import { pokemonListSaga } from '../features/pokemons/store/pokemonList/pokemonListSaga';

export function* mainSaga() {
  yield fork(pokemonListSaga);
}
