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
  LoadingComponent?: React.ComponentClass | React.FC;
  renderLoading?: () => React.ReactNode;
}>;

export const FetchWrapper: React.FC<FetchWrapperProps> = ({
  children,
  isLoading,
  isError,
  LoadingComponent,
  renderLoading,
}) => {
  const { t } = useTranslation();
  const Component = LoadingComponent ?? ProgressIndicator;
  if (isError) {
    return t('error');
  }
  if (renderLoading) {
    return isLoading ? renderLoading() : children;
  }

  return isLoading ? <Component /> : children;
};

type StatusFetchWrapperProps = React.PropsWithChildren<{
  status: RequestStatus;
}> &
  Pick<FetchWrapperProps, 'LoadingComponent' | 'renderLoading'>;
export const StatusFetchWrapper: React.FC<StatusFetchWrapperProps> = ({
  children,
  status,
  ...rest
}) => {
  return (
    <FetchWrapper
      isLoading={isRequestInProgress(status)}
      isError={isRequestFailed(status)}
      {...rest}
    >
      {children}
    </FetchWrapper>
  );
};
