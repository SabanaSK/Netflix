// // src/mocks/browser.js
// import { setupWorker } from 'msw'
// import { handlers } from './handlers'

// // This configures a Service Worker with the given request handlers.
// export const worker = setupWorker(...handlers)

import { setupWorker } from 'msw';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);
worker.start({
  onUnhandledRequest: 'bypass'
});

console.log("MSW started");
