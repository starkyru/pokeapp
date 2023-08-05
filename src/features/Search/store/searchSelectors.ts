import type { RootState } from '../../../store';

export const getSearchString = (state: RootState) => state.search.searchString;
