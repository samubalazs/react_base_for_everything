import React from 'react';
import express from 'express';
import cors from 'cors';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../App';
import universalReducer from '../reducers/universalReducer';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.static('public'));

function renderFullPage(html, preloadedState, helmet) {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Build me up</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(preloadedState)}</script>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
}

function handleRender(req, res) {
  const store = createStore(universalReducer);
  const location = req.url;
  const context = {};

  const html = renderToString(
    <StaticRouter basename='/' location={location} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
}

app.get('/*', handleRender);

app.listen(port);
