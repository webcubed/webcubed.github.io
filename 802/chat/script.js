const apiBaseUrl = "https://recline-backend.onrender.com";
let continueId;
const mappings = (async () => {
	const response = await fetch("https://recline-backend.vercel.app/mappings");
	return response.json();
})();
const socket = new WebSocket(`${apiBaseUrl.replace("https", "wss")}`);
socket.addEventListener("open", () => {
	socket.send(`${localStorage.getItem("email")} is connected`);
});
function createMessageElement(message) {
	const content = DOMPurify.sanitize(message.cleanContent);
	mappings.then((mappings) => {
		const authorMapping = mappings.find(
			(mapping) => mapping.account === localStorage.getItem("email")
		);
		messageElement.className =
			authorMapping.name === message.author ? "message self" : "message other";
	});
	const messageElement = document.createElement("div");
	messageElement.classList.add("message");
	messageElement.innerHTML = `
		<div class="messageHeader">
			<b class="messageAuthor">${message.author}: </b>
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
		</div>
		<p class="messageContent">${content}</p>
	`;
	return messageElement;
}

function scrollToBottom() {
	document.querySelector("#messages").scrollTo({
		top: document.querySelector("#messages").scrollHeight,
	});
}

function fetchmessages(LMID = null) {
	// LMID = last message id = continueId
	fetch(`${apiBaseUrl}/fetchMessages${LMID ? `?continueId=${LMID}` : ""}`, {
		method: "GET",
		headers: {
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// Scratch that let's do parsing serverside
			continueId = data.continueId;
			const messages = data.messages;
			const messagesContainer = document.querySelector("#messages");
			// Reverse the array if LMID is specified
			if (LMID) messages.reverse();
			for (const message of messages) {
				const messageElement = createMessageElement(message);
				if (LMID === null) {
					messagesContainer.append(messageElement);
					scrollToBottom();
				} else {
					messagesContainer.prepend(messageElement);
				}
			}
		});
}

function sendMessage() {
	const message = document.querySelector("#messageinput").value;
	fetch(`${apiBaseUrl}/sendMessage`, {
		method: "POST",
		body: JSON.stringify({ message }),
		headers: {
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
			"Content-Type": "application/json",
		},
	});
	// Clear input field
	document.querySelector("#messageinput").value = "";
}

document.addEventListener("DOMContentLoaded", async () => {
	if (localStorage.getItem("code") && localStorage.getItem("email")) {
		const response = await fetch(`${apiBaseUrl}/checkSession`, {
			method: "GET",
			headers: {
				account: localStorage.getItem("email"),
				code: localStorage.getItem("code"),
			},
		});
		const data = await response.text();
		if (data !== "authorized :>") {
			globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
		}
	} else {
		globalThis.location.href = `${globalThis.location.origin}/802/chat/auth`;
	}

	const messagesContainer = document.querySelector("#messages");
	socket.addEventListener("message", (event) => {
		const message = JSON.parse(event.data);
		const messageElement = createMessageElement(message);
		messagesContainer.append(messageElement);
		scrollToBottom();
	});
	fetchmessages();
	scrollToBottom();
	document.querySelector("#messageinput").focus();
	document.querySelector("#submit").addEventListener("click", sendMessage);
	document
		.querySelector("#messageinput")
		.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				sendMessage();
			}
		});
	document.querySelector("#messages").addEventListener("scroll", () => {
		if (document.querySelector("#messages").scrollTop === 0) {
			fetchmessages(continueId);
		}
	});
});
