import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';

import { pokemonListReducer } from '../features/pokemons/store/pokemonList/pokemonListSlice';
import { searchReducer } from '../features/Search/store/searchSlice';
import { pokemonApi } from '../services/pokemonApi';

import { mainSaga } from './mainSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    pokemonList: pokemonListReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
  }),
);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware, sagaMiddleware),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
