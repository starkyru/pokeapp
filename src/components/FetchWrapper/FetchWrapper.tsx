import React from 'react';
import { useTranslation } from 'react-i18next';

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
