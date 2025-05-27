const apiBaseUrl = "https://recline-backend.onrender.com";
let continueId;
const mappings = (async () => {
	const response = await fetch("https://recline-backend.vercel.app/mappings");
	return response.json();
})();
function fetchmessages(LMID = null) {
	// LMID = last message id = continueId
	fetch(`${apiBaseUrl}/fetchMessages`, {
		method: "POST",
		body: JSON.stringify({
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
			continueId: LMID ?? null,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// Scratch that let's do parsing serverside
			continueId = data.continueId;
			const messages = data.messages;
			const messagesContainer = document.querySelector("#messages");
			messagesContainer.innerHTML = "";
			for (const message of messages) {
				const content = message.cleanContent;
				const messageElement = document.createElement("div");
				mappings.then((mappings) => {
					const authorMapping = mappings.find(
						(mapping) => mapping.account === localStorage.getItem("email")
					);
					messageElement.className =
						authorMapping.name === message.author
							? "message self"
							: "message other";
				});
				messageElement.innerHTML = `
				<b class="messageAuthor">${message.author}: </b><p class="messageContent">${content}</p>
	<span class="messageTimestamp">
		${
			new Date(Number.parseInt(message.timestamp, 10))
				.toISOString()
				.slice(0, 10) === new Date().toISOString().slice(0, 10)
				? new Date(Number.parseInt(message.timestamp, 10)).toLocaleString(
						undefined,
						{
							weekday: "short",
							hour: "2-digit",
							minute: "2-digit",
						}
					)
				: new Date(Number.parseInt(message.timestamp, 10)).toLocaleString(
						undefined,
						{
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						}
					)
		}
	</span>
				`;
				messagesContainer.append(messageElement);
			}
		});
}

function sendMessage() {
	const message = document.querySelector("#messageinput").value;
	fetch(`${apiBaseUrl}/sendMessage`, {
		method: "POST",
		body: JSON.stringify({
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
			message,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	const messagesContainer = document.querySelector("#messages");
	const socket = new WebSocket(`${apiBaseUrl.replace("https", "wss")}`);
	socket.addEventListener("open", () => {
		socket.send(
			JSON.stringify({
				account: localStorage.getItem("email"),
				code: localStorage.getItem("code"),
			})
		);
	});
	socket.addEventListener("message", (event) => {
		const message = JSON.parse(event.data);
		// Data will most likely contain a message object
		const content = message.cleanContent;
		const messageElement = document.createElement("div");
		mappings.then((mappings) => {
			const authorMapping = mappings.find(
				(mapping) => mapping.account === localStorage.getItem("email")
			);
			messageElement.className =
				authorMapping.name === message.author
					? "message self"
					: "message other";
		});
		messageElement.innerHTML = `
	<b class="messageAuthor">${message.author}: </b><p class="messageContent">${content}</p>
	<span class="messageTimestamp">
		${
			new Date(Number.parseInt(message.timestamp, 10))
				.toISOString()
				.slice(0, 10) === new Date().toISOString().slice(0, 10)
				? new Date(Number.parseInt(message.timestamp, 10)).toLocaleString(
						undefined,
						{
							weekday: "short",
							hour: "2-digit",
							minute: "2-digit",
						}
					)
				: new Date(Number.parseInt(message.timestamp, 10)).toLocaleString(
						undefined,
						{
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						}
					)
		}
	</span>
	`;
		messagesContainer.append(messageElement);
	});
	try {
		if (localStorage.getItem("code") && localStorage.getItem("email")) {
			const response = await fetch(`${apiBaseUrl}/checkSession`, {
				method: "POST",
				body: JSON.stringify({
					account: localStorage.getItem("email"),
					code: localStorage.getItem("code"),
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.text();
			if (data !== "authorized :>") {
				globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
			}
		} else {
			globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
		}
	} catch {
		globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
	}

	fetchmessages();
	// Scroll to bottom of document
	document.scrollTo({
		top: document.scrollHeight,
	});
	document.querySelector("#messageinput").focus();
	document.querySelector("#submit").addEventListener("click", sendMessage);
	document
		.querySelector("#messageinput")
		.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				sendMessage();
			}
		});
});
