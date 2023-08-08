import ky from 'ky';
import { call, put } from 'redux-saga/effects';

import { POKEMON_BASE_URL } from '../../../../services/pokemonApi';
import type {
  NamedAPIResource,
  NamedAPIResourceList,
} from '../../../../utils/models';

import { fetchActions, set } from './pokemonListSlice';

const PAGE_SIZE = 1500;

export async function fetchPokemon(offset: number, limit: number) {
  return await ky(
    `${POKEMON_BASE_URL}pokemon/?limit=${limit}&offset=${offset}`,
  ).json();
}
export function* pokemonListSaga(itemsPerPage: number = PAGE_SIZE) {
  let current = 0,
    shouldContinue;
  let list: NamedAPIResource[] = [];
  try {
    do {
      const result: NamedAPIResourceList = yield call(
        fetchPokemon,
        current,
        itemsPerPage,
      );
      current += itemsPerPage;
      shouldContinue = current < result.count;
      list = [...list, ...result.results];
    } while (shouldContinue);
    yield put(set(list));
  } catch (e) {
    // TODO: error handling
    yield put(fetchActions.fail({ error: (e as Error).message }));
  }
}
