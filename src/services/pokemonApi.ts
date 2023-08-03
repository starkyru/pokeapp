import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ky from 'ky'

import type { NamedAPIResourceList } from '../utils/models'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    fetchFn: (...args) => ky(...args),
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query<NamedAPIResourceList, void>({
      query: () => `/pokemon`,
    }),
  }),
  reducerPath: 'docsApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonQuery } = pokemonApi
