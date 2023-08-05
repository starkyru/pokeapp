import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist/es/constants';

export interface SearchFieldState {
  searchString: string;
  history: string[];
}

const initialState: SearchFieldState = {
  history: [],
  searchString: '',
};

export const searchSlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === REHYDRATE,
      (state, action: PayloadAction<{ search: SearchFieldState }>) => {
        state.history = action?.payload?.search?.history ?? [];
        state.searchString = '';
      },
    );
  },
  initialState,
  name: 'search',
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      const newHistory = state.history.filter((i) => i !== action.payload);
      newHistory.unshift(action.payload);
      state.history = newHistory;
    },
  },
});

// Action creators are generated for each case reducer function
export const { search } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
