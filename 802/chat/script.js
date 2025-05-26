const apiBaseUrl = "https://recline-backend.onrender.com";
let continueId;
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
				messageElement.className = "message";
				messageElement.innerHTML = `
				<b>${message.author}: </b><p>${content}</p>
				`;
				messagesContainer.append(messageElement);
			}
		});
}

function sendMessage() {
	const message = document.querySelector("#messageinput").value;
	const messageElement = document.createElement("div");
	messageElement.className = "message myMessage";
	messageElement.textContent = message;
	document.querySelector("#messages").append(messageElement);
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
	})
		.then((response) => response.json())
		.then((data) => {
			const responseElement = document.createElement("div");
			responseElement.className = "message";
			responseElement.innerHTML = data.response;
			document.querySelector("#messages").append(responseElement);
		});
}

document.addEventListener("DOMContentLoaded", async () => {
	const socket = new WebSocket(`${apiBaseUrl.replace("https", "wss")}/ws`);
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
		messageElement.className = "message";
		messageElement.innerHTML = `
	<b>${message.author}: </b><p>${content}</p>
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
