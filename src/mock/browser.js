// // This configures a Service Worker with the given request handlers.
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
worker.start({
	onUnhandledRequest: "bypass",
});
