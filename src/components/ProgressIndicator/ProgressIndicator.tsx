import React from 'react';
import { useTranslation } from 'react-i18next';

export const ProgressIndicator: React.FC = () => {
  const { t } = useTranslation();
  return <div>{t('loading')}</div>;
};
