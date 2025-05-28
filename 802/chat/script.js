const apiBaseUrl = "https://recline-backend.onrender.com";
let continueId;
const mappings = (async () => {
	const response = await fetch(`${apiBaseUrl}/mappings`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
		},
	});
	return response.json();
})();
const socket = new WebSocket(`${apiBaseUrl.replace("https", "wss")}`);
socket.addEventListener("open", () => {
	socket.send(`${localStorage.getItem("email")} is connected`);
});
function createMessageElement(message) {
	const content = DOMPurify.sanitize(message.cleanContent);
	let isSelf;
	mappings.then((mappings) => {
		const authorMapping = mappings.find(
			(mapping) => mapping.account === localStorage.getItem("email")
		);
		isSelf = authorMapping.name === message.author;
		messageElement.className = isSelf ? "message self" : "message other";
	});
	const messageElement = document.createElement("div");
	messageElement.id = message.id;
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
			${
				isSelf || localStorage.getItem("admin")
					? '<button class="messageDelete" onclick="deleteMessage(\'' +
						message.id +
						"')\">delete</button>"
					: ""
			}
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

function fetchMessages(LMID = null) {
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

function deleteMessage(id) {
	if (
		!document
			.querySelector(`#${id} > .messageDelete`)
			.classList.contains("confirming")
	) {
		document
			.querySelector(`#${id} > .messageDelete`)
			.classList.add("confirming");
		document.querySelector(`#${id} > .messageDelete`).textContent = "you sure?";
		return;
	}

	fetch(`${apiBaseUrl}/deleteMessage`, {
		method: "POST",
		body: JSON.stringify({ id }),
		headers: {
			account: localStorage.getItem("email"),
			code: localStorage.getItem("code"),
			"Content-Type": "application/json",
		},
	});
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
		const data = JSON.parse(event.data);
		if (data.type === "message") {
			const message = data.data;
			const messageElement = createMessageElement(message);
			messagesContainer.append(messageElement);
			scrollToBottom();
		} else if (data.type === "delete") {
			// Physically remove element from dom
			document.querySelector(`#${data.data}`).remove();
		}
	});
	fetchMessages();
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
			fetchMessages(continueId);
		}
	});
});
