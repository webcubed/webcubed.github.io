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
const maxRetries = 30;
let retryCount = 0;
const retryDelay = 5000;
function createMessageElement(message) {
	const content = DOMPurify.sanitize(message.cleanContent);
	const messageElement = document.createElement("div");
	messageElement.id = `message-${message.id}`;
	messageElement.classList.add("message");
	messageElement.innerHTML = `
		<div class="messageHeader">
			<b class="messageAuthor">${message.author}: </b>
			<div class="headerRight">
				<span class="messageTimestamp">
					${(() => {
						const today = new Date();
						const messageDate = new Date(
							Number.parseInt(message.timestamp, 10)
						);
						const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);
						if (today.toDateString() === messageDate.toDateString()) {
							return messageDate.toLocaleString(undefined, {
								hour: "2-digit",
								minute: "2-digit",
							});
						}

						if (yesterday.toDateString() === messageDate.toDateString()) {
							return `Yesterday at ${messageDate.toLocaleString(undefined, {
								hour: "2-digit",
								minute: "2-digit",
							})}`;
						}

						return messageDate.toLocaleString(undefined, {
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						});
					})()}
				</span>
			</div>
		</div>
		<p class="messageContent">${content}</p>
	`;
	mappings.then((mappings) => {
		const authorMapping = mappings.find(
			(mapping) => mapping.account === localStorage.getItem("email")
		);
		const isSelf = authorMapping.name === message.author;
		messageElement.className = isSelf ? "message self" : "message other";
		if (isSelf || localStorage.getItem("admin")) {
			const deleteButton = document.createElement("span");
			deleteButton.classList = "messageDelete material-symbols-outlined";
			deleteButton.textContent = "delete";
			deleteButton.addEventListener("click", () => {
				deleteMessage(message.id);
			});
			messageElement.append(deleteButton);
			messageElement
				.querySelector(".messageHeader > .headerRight")
				.append(deleteButton);
		}
	});
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
	const deleteElement = document.querySelector(
		`#message-${id} > .messageHeader > .headerRight > .messageDelete`
	);
	if (!deleteElement.classList.contains("confirming")) {
		deleteElement.classList.add("confirming");
		deleteElement.classList.remove("material-symbols-outlined");
		deleteElement.innerHTML = "you sure?";
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
	function connectToWebsocket() {
		const socket = new WebSocket(`${apiBaseUrl.replace("https", "wss")}`);
		socket.addEventListener("open", () => {
			socket.send(`${localStorage.getItem("email")} is connected`);
			if (retryCount > 0) {
				new Toast(
					"success",
					"Websocket Connection restored. Refetching messages.",
					`Reconnected after ${retryCount} attempts`,
					5000
				);
				retryCount = 0;
				// Clear messages & refetch
				messagesContainer.innerHTML = "";
				fetchMessages();
			}
		});
		socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			if (data.type === "message") {
				const message = data.data;
				const messageElement = createMessageElement(message);
				messagesContainer.append(messageElement);
				scrollToBottom();
			} else if (data.type === "delete") {
				// Physically remove element from dom
				document.querySelector(`#message-${data.data}`).remove();
			}
		});
		socket.addEventListener("close", () => {
			// Retry connection
			if (retryCount < maxRetries) {
				setTimeout(() => {
					retryCount++;
					new Toast(
						"warning",
						"Websocket Connection lost",
						`Retrying connection... Attempt ${retryCount}`,
						5000
					);
					connectToWebsocket();
				}, retryDelay);
			} else {
				new Toast(
					"error",
					"Websocket Connection lost",
					"Max retries reached. Giving up. If you want to try again, reload the page.",
					5000
				);
			}
		});
	}

	connectToWebsocket();

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
