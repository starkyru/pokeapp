import React from 'react';
import { useTranslation } from 'react-i18next';

import type { RequestStatus } from '../../utils/requestStatus';
import {
  isRequestFailed,
  isRequestInProgress,
} from '../../utils/requestStatus';
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';

type FetchWrapperProps = React.PropsWithChildren<{
  isLoading: boolean;
  isError: boolean;
}>;

export const FetchWrapper: React.FC<FetchWrapperProps> = ({
  children,
  isLoading,
  isError,
}) => {
  const { t } = useTranslation();
  return isError ? t('error') : isLoading ? <ProgressIndicator /> : children;
};

type StatusFetchWrapperProps = React.PropsWithChildren<{
  status: RequestStatus;
}>;
export const StatusFetchWrapper: React.FC<StatusFetchWrapperProps> = ({
  children,
  status,
}) => {
  return (
    <FetchWrapper
      isLoading={isRequestInProgress(status)}
      isError={isRequestFailed(status)}
    >
      {children}
    </FetchWrapper>
  );
};
