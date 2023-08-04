import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import createSagaMiddleware from 'redux-saga';

import { pokemonListReducer } from '../features/pokemons/store/pokemonList/pokemonListSlice';
import { pokemonApi } from '../services/pokemonApi';

import { mainSaga } from './mainSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, sagaMiddleware),
  reducer: {
    pokemonList: pokemonListReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
});

sagaMiddleware.run(mainSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
