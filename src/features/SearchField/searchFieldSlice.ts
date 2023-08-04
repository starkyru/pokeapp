import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface SearchFieldState {
  searchString: string;
  searchHistory: string[];
}

const initialState: SearchFieldState = {
  searchHistory: [],
  searchString: '',
};

export const searchFieldSlice = createSlice({
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
