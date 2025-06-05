// This code sample uses features introduced in Workbox v6.
import { Workbox } from "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-window.prod.mjs";

if ("serviceWorker" in navigator) {
	const wb = new Workbox(`${globalThis.location.origin}/sw.js`);
	const showSkipWaitingPrompt = async () => {
		wb.addEventListener("controlling", () => {
			globalThis.location.reload();
		});

		const updateAccepted = await promptForUpdate();

		if (updateAccepted) {
			wb.messageSkipWaiting();
		}
	};

	wb.addEventListener("waiting", (event) => {
		showSkipWaitingPrompt(event);
	});

	wb.register();
}
