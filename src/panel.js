import * as React from 'karet';
import { render } from 'react-dom';
import { curry, curryN } from 'ramda';
import * as L from 'partial.lenses';

import App from './app';

//

const port = chrome.runtime.connect({ name: 'my-message-port-name' });

// Utility functions

const getHeader = curry((name, headers) => headers.find(header => header.name === name));
const startsWith = curry((pattern, string) => pattern.exec(string));

//

chrome.devtools.network.onRequestFinished.addListener(
  networkRequest => {
    const { request, response } = networkRequest;
    const contentType = L.get(['content', 'mimeType'], response);

    /**
     * In case you only want to do Some Stuff on certain requests,
     * wrap the `networkRequest.getContent` function call in an `if`-block;
     *
     * if (request.url === 'https://abc') {
     *   networkRequest.getContent(...);
     * }
     */

    console.groupCollapsed(request.url);

    console.log({ request, response });

    // if (contentType === 'application/json') {
      networkRequest.getContent(content => {
        // Do Stuff with the request body content
        console.log('networkRequest.getContent', { content });
        port.postMessage({ request, response, content });
      });
    // }

    console.groupEnd();
  }
);

// Mount React application

const root = document.createElement('div');
document.body.appendChild(root);

render(<App />, root)
