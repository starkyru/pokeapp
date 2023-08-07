import { type ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import type { RequestStatus } from './requestStatus';
import {
  requestFailed,
  requestInProgress,
  requestSuccess,
} from './requestStatus';
import type { KeysMatching } from './typeUtils';

export const createFetchActions = (prefix: string) => {
  return {
    fail: createAction<{ error?: string; errorCode?: number }>(
      `${prefix}/fail`,
    ),
    fetch: createAction(`${prefix}/fetch`),
    progress: createAction<number>(`${prefix}/progress`),
    success: createAction(`${prefix}/success`),
  };
};

type CreateFetchActions = ReturnType<typeof createFetchActions>;
type RequestKeys<State> = KeysMatching<State, RequestStatus>;
export const addFetchCases = <State>(
  builder: ActionReducerMapBuilder<State>,
  actions: CreateFetchActions,
  statusKey: RequestKeys<State>,
): ActionReducerMapBuilder<State> => {
  return builder
    .addCase(actions.fetch, (state) => {
      // @ts-ignore I know better
      state[statusKey] = requestInProgress();
    })
    .addCase(actions.progress, (state, action) => {
      // @ts-ignore I know better
      state[statusKey] = requestInProgress(action.payload);
    })
    .addCase(actions.fail, (state, action) => {
      // @ts-ignore I know better
      state[statusKey] = requestFailed(
        action.payload.error,
        action.payload.errorCode,
      );
    })
    .addCase(actions.success, (state) => {
      // @ts-ignore I know better
      state[statusKey] = requestSuccess();
    });
};
