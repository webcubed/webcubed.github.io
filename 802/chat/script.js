const apiBaseUrl = "https://recline-backend.onrender.com";
function fetchmessages() {
	fetch(`${apiBaseUrl}/fetchMessages`, {
		method: "POST",
		body: JSON.stringify({
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// We will recieve a json containing our continueId and messages as an array.
			// In the messages array, each item will be another array.
			// In this 2nd array, the first item will be the message Id,
			// And the second item will be the message information
			// Including the timestamp, which we will use to sort these messages in order and
			// Potentially append a date to the message
			const messages = data.messages;
			const messagesContainer = document.querySelector("#messages");
			messagesContainer.innerHTML = "";
			for (const message of messages) {
				const messageElement = document.createElement("div");
				messageElement.className = "message";
				messageElement.innerHTML = message;
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
		body: message,
		headers: {
			"Content-Type": "text/plain",
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
