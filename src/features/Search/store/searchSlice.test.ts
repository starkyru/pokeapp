import { REHYDRATE } from 'redux-persist/es/constants';

import type { SearchState } from './searchSlice';
import { search, searchReducer } from './searchSlice';

test('should return the initial state', () => {
  expect(searchReducer(undefined, { type: undefined })).toMatchObject({
    history: [],
    searchString: '',
  });
});

test('should properly handle empty search', () => {
  const previousState: SearchState = {
    history: [],
    searchString: '',
  };

  expect(searchReducer(previousState, search(''))).toMatchObject({
    history: [],
    searchString: '',
  });
});

test('should properly handle search', () => {
  const previousState: SearchState = {
    history: [],
    searchString: '',
  };

  expect(searchReducer(previousState, search('search'))).toMatchObject({
    history: ['search'],
    searchString: 'search',
  });
});

test('should properly handle search with non-empty state', () => {
  const previousState: SearchState = {
    history: ['aa', 'bb'],
    searchString: '',
  };

  expect(searchReducer(previousState, search('search'))).toMatchObject({
    history: ['search', 'aa', 'bb'],
    searchString: 'search',
  });
});

test('should properly handle search with duplicates', () => {
  const previousState: SearchState = {
    history: ['aa', 'bb', 'cc'],
    searchString: '',
  };

  expect(searchReducer(previousState, search('bb'))).toMatchObject({
    history: ['bb', 'aa', 'cc'],
    searchString: 'bb',
  });
});

test('should properly handle REHYDRATE', () => {
  expect(
    searchReducer(undefined, {
      payload: { search: { history: ['aa', 'bb', 'cc'] } },
      type: REHYDRATE,
    }),
  ).toMatchObject({
    history: ['aa', 'bb', 'cc'],
    searchString: '',
  });
});
