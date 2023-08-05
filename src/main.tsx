import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import { persistor, store } from './store';

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
            <App />
          </PersistGate>
        </Provider>,
      );
    });
} else {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
