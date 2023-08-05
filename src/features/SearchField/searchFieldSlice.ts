import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist/es/constants';

export interface SearchFieldState {
  searchString: string;
  searchHistory: string[];
}

const initialState: SearchFieldState = {
  searchHistory: [],
  searchString: '',
};

export const searchFieldSlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === REHYDRATE,
      (state, action: PayloadAction<SearchFieldState>) => {
        state.searchHistory = action?.payload?.searchHistory ?? [];
        state.searchString = '';
      },
    );
  },
  initialState,
  name: 'searchField',
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      state.searchHistory.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { search } = searchFieldSlice.actions;
export const searchFieldReducer = searchFieldSlice.reducer;
