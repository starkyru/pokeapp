import { render, screen } from '@testing-library/react';
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

  expect(screen.getByText('Pokedex')).toBeInTheDocument();
});
