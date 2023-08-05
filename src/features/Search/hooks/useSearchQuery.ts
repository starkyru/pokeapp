import React from 'react';
import { useLocation } from 'react-router-dom';

export function useSearchQuery() {
  const { search } = useLocation();

  return React.useMemo(
    () => new URLSearchParams(search).get('search') ?? '',
    [search],
  );
}
