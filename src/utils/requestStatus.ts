export type RequestStatusProgress = {
  type: 'active';
  progress?: number;
};

export type RequestStatusFailed = {
  type: 'failed';
  errorCode?: number;
  error?: string;
};

export type RequestStatusSuccessful = {
  type: 'successful';
};

export type RequestStatusInactive = {
  type: 'inactive';
  message?: string;
};

export type RequestStatus =
  | RequestStatusProgress
  | RequestStatusFailed
  | RequestStatusInactive
  | RequestStatusSuccessful;

export type RequestStatusType = RequestStatus['type'];

export function requestInProgress(progress?: number) {
  return { progress, type: 'active' } as RequestStatus;
}

export function requestFailed(error?: string, errorCode?: number) {
  return { error, errorCode, type: 'failed' } as RequestStatus;
}

const REQUEST_INACTIVE_EMPTY = {
  type: 'inactive',
} as RequestStatus;

export function requestInactive(message?: string) {
  if (message === undefined) return REQUEST_INACTIVE_EMPTY;
  return { message, type: 'inactive' } as RequestStatus;
}

export function requestSuccess() {
  return { type: 'successful' } as RequestStatus;
}
export function isRequestInProgress(status: RequestStatus) {
  return status.type === 'active';
}

export function isRequestFailed(status: RequestStatus) {
  return status.type === 'failed';
}

export function isRequestSuccessful(status: RequestStatus) {
  return status.type === 'successful';
}

export function isRequestInactive(status: RequestStatus) {
  return status.type === 'inactive';
}

export function getRequestError(...statuses: RequestStatus[]) {
  const status = statuses.find((status) => status.type === 'failed');

  if (status && status.type === 'failed') {
    return status.error ? status.error : 'Error';
  }

  return undefined;
}
