import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
  addFetchCases,
  createFetchActions,
} from '../../../../utils/fetchStateUtils';
import type { NamedAPIResource } from '../../../../utils/models';
import type { RequestStatus } from '../../../../utils/requestStatus';
import { requestInactive } from '../../../../utils/requestStatus';

export interface PokemonListState {
  list: NamedAPIResource[];
  status: RequestStatus;
}

const initialState: PokemonListState = {
  list: [],
  status: requestInactive(),
};

export const fetchActions = createFetchActions('pokemonList');

export const pokemonListSlice = createSlice({
  extraReducers: (builder) => {
    addFetchCases(builder, fetchActions, 'status');
  },
  initialState,
  name: 'pokemonList',
  reducers: {
    set: (state, action: PayloadAction<PokemonListState['list']>) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = pokemonListSlice.actions;
export const pokemonListReducer = pokemonListSlice.reducer;
