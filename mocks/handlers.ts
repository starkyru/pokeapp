import { rest } from 'msw';
import { POKEMON_LIST_MOCK } from './pokemonListMock';
import { VENUSAZAUR_MOCK } from './venusazaurMock';

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/', (req, res, ctx) => {
    const data = POKEMON_LIST_MOCK;
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/*', (req, res, ctx) => {
    const data = VENUSAZAUR_MOCK;
    return res(ctx.status(200), ctx.json(data));
  }),
];
