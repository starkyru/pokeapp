import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ky from 'ky';

import type { NamedAPIResourceList, Pokemon } from '../utils/models';

export const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: POKEMON_BASE_URL,
    fetchFn: (...args) => ky(...args),
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query<NamedAPIResourceList, void>({
      query: () => `pokemon`,
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
  reducerPath: 'pokemonApi',
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonQuery, useGetPokemonByNameQuery } = pokemonApi;
