import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { store } from './store';

test('Show App Component', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );

  // expect(screen.getByText('Hello Vite + RTK Query!')).toBeInTheDocument();
});

test('working with msw', async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );
  // await waitFor(() => {
  // expect(screen.getByText('Redux Toolkit')).toBeInTheDocument();
  // expect(screen.getByText('MSW')).toBeInTheDocument();
  // expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  // });
});
