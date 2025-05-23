const apiBaseUrl = "https://recline-backend.vercel.app";
function checkSession() {
	if (localStorage.getItem("code") && localStorage.getItem("email")) {
		fetch(`${apiBaseUrl}/checkSession`, {
			method: "POST",
			body: JSON.stringify({
				account: localStorage.getItem("email"),
				code: localStorage.getItem("code"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.text())
			.then((data) => {
				if (data !== "authorized :>") {
					globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
				}
			});
	} else {
		globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
	}
}

checkSession();
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

document.addEventListener("DOMContentLoaded", () => {
	fetchmessages();
	document.querySelector("#messageinput").focus();
	document.querySelector("#submit").addEventListener("click", sendMessage);
});
document.querySelector("#messageinput").addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		sendMessage();
	}
});
