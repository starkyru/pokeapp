import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { persistor, store } from './store';
import './index.css';

const USE_MOCKS = false;

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      if (USE_MOCKS) {
        worker.start();
      }
    })
    .then(() => {
      root.render(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <App />
            </Router>
          </PersistGate>
        </Provider>,
      );
    });
} else {
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>,
  );
}
