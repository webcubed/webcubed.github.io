/* eslint-disable @stylistic/indent */
/* eslint-disable unicorn/prefer-dom-node-text-content */
const apiBaseUrl = "https://recline-backend.onrender.com";
let continueId;
let continueScroll;
const maxRetries = 30;
let notificationsPermitted = Notification.permission === "granted";
let retryCount = 0;
const retryDelay = 5000;

function createMessageElement(
	message,
	editedTimestamp = message.editedTimestamp
) {
	const content = DOMPurify.sanitize(
		marked.parse(message.cleanContent.replaceAll("\n", "<br>"))
	);
	const messageElement = document.createElement("div");
	messageElement.id = `message-${message.id}`;
	messageElement.classList.add("message");
	messageElement.innerHTML = /* html */ `
		<div class="messageHeader">
			<b class="messageAuthor" title=${message.email}>${message.author}: </b>
			<div class="headerRight">
				<span class="messageTimestamp" title="Timestamp: ${message.timestamp}, Parsed: ${new Date(
					message.timestamp
				).toLocaleString()}">
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
				${
					editedTimestamp === null
						? ""
						: /* html */ `<i class="messageEdited" title="Edited: ${editedTimestamp}, Parsed: ${new Date(
								editedTimestamp
							).toLocaleString()}">Edited: 
					${(() => {
						const today = new Date();
						const messageDate = new Date(Number.parseInt(editedTimestamp, 10));
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
					})()}</i>`
				}
			</div>
		</div>
		<p class="messageContent">${content}</p>
	`;
	const isSelf = message.email === localStorage.getItem("email");
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

	return messageElement;
}

function scrollToBottom() {
	document.querySelector("#messages").scrollTo({
		top: document.querySelector("#messages").scrollHeight,
	});
}

function differentDays(firstTimstamp, secondTimestamp) {
	const firstDate = new Date(firstTimstamp);
	const secondDate = new Date(secondTimestamp);
	return (
		firstDate.getDate() !== secondDate.getDate() ||
		firstDate.getMonth() !== secondDate.getMonth() ||
		firstDate.getFullYear() !== secondDate.getFullYear()
	);
}

async function fetchMessages(LMID = null) {
	// LMID = Last Message ID = continueId
	const response = await fetch(
		`${apiBaseUrl}/fetchMessages${LMID ? `?continueId=${LMID}` : ""}`,
		{
			method: "GET",
			headers: {
				account: localStorage.getItem("email"),
				code: localStorage.getItem("code"),
			},
		}
	);
	const data = await response.json();
	// Scratch that let's do parsing serverside
	continueId = data.continueId;
	const { messages } = data;
	const messagesContainer = document.querySelector("#messages");
	// Reverse the array if LMID is specified
	if (LMID) messages.reverse();
	for (const message of messages) {
		const messageElement = createMessageElement(message);

		if (
			messagesContainer.lastElementChild !== null &&
			!messagesContainer.lastElementChild.classList.contains("dayDivider")
		) {
			const lastMessageTimestamp = Number.parseInt(
				messagesContainer.lastElementChild
					.querySelector(".messageHeader > .headerRight > .messageTimestamp")
					.title.match(/Timestamp: (\d+),/)[1]
			);
			const messageTimestamp = message.timestamp;
			if (differentDays(lastMessageTimestamp, messageTimestamp)) {
				const dayLine = document.createElement("div");
				dayLine.className = "dayDivider";
				dayLine.innerHTML = `<span class="dayDividerText">${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(messageTimestamp))}</span>`;
				messagesContainer.append(dayLine);
			}
		}

		if (LMID === null) {
			messagesContainer.append(messageElement);
			scrollToBottom();
		} else {
			messagesContainer.prepend(messageElement);
			messagesContainer.scrollTo({
				top: messagesContainer.scrollHeight - continueScroll,
			});
		}
	}
}

function sendMessage() {
	const message = document.querySelector("#messageinput").innerText;
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
	document.querySelector("#messageinput").innerText = "";
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

let sendNotifications = false;
document.addEventListener(
	"click",
	async () => {
		if (notificationsPermitted) return;
		const prompt = await promptForNotificationPermission();
		if (prompt) {
			await Notification.requestPermission();
		}

		if (prompt && Notification.permission === "granted") {
			notificationsPermitted = true;
		}
	},
	{ once: true }
);
document.addEventListener("DOMContentLoaded", async () => {
	const messagesContainer = document.querySelector("#messages");
	const WSStatusElement = document.querySelector("#websocketstatus");
	function connectToWebsocket() {
		const socket = new WebSocket(
			`${apiBaseUrl.replace("https", "wss")}?email=${localStorage.getItem("email")}&code=${localStorage.getItem("code")}`
		);
		socket.addEventListener("open", () => {
			socket.send(`${localStorage.getItem("email")} is connected`);
			WSStatusElement.textContent = "Connected";
			WSStatusElement.classList.remove("error");
			WSStatusElement.classList.add("success");
			if (retryCount > 0) {
				new Toast(
					"success",
					"Websocket Connection restored",
					`Reconnected after ${retryCount} attempts. Refetching messages.`,
					5000
				);
				retryCount = 0;
				// Clear messages & refetch
				scrollToBottom();
				messagesContainer.innerHTML = "";
				fetchMessages();
			}
		});
		socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			switch (data.type) {
				case "message": {
					const message = data.data;
					if (
						messagesContainer.lastElementChild !== null &&
						!messagesContainer.lastElementChild.classList.contains("dayDivider")
					) {
						const lastMessageTimestamp = Number.parseInt(
							messagesContainer.lastElementChild
								.querySelector(
									".messageHeader > .headerRight > .messageTimestamp"
								)
								.title.match(/Timestamp: (\d+),/)[1]
						);
						const messageTimestamp = message.timestamp;
						if (differentDays(lastMessageTimestamp, messageTimestamp)) {
							const dayLine = document.createElement("div");
							dayLine.className = "dayDivider";
							dayLine.innerHTML = `<span class="dayDividerText">${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(messageTimestamp))}</span>`;
							messagesContainer.append(dayLine);
						}
					}

					const messageElement = createMessageElement(message);
					messagesContainer.append(messageElement);
					scrollToBottom();
					// Push notification
					if (sendNotifications) {
						new Notification(
							`${message.author} (802 Chat)`,
							{
								body: message.cleanContent,
							},
							() => {
								window.focus();
							}
						);
					}

					break;
				}

				case "delete": {
					// Physically remove element from dom
					document.querySelector(`#message-${data.data}`).remove();

					break;
				}

				case "update": {
					const message = data.data;
					const content = createMessageElement(message, data.editedTimestamp);
					document.querySelector(`#message-${message.id}`).replaceWith(content);

					break;
				}
				// No default
			}
		});
		function retryConnection() {
			if (retryCount < maxRetries) {
				setTimeout(() => {
					retryCount++;
					connectToWebsocket();
					new Toast(
						"warning",
						"Websocket Connection lost",
						`Retrying connection... Attempt ${retryCount}`,
						5000
					);
				}, retryDelay);
			} else {
				new Toast(
					"error",
					"Websocket Connection lost",
					"Max retries reached. Giving up. If you want to try again, reload the page.",
					5000
				);
				socket.removeEventListener("close", retryConnection);
				WSStatusElement.textContent = "Disconnected";
				WSStatusElement.classList.remove("success");
				WSStatusElement.classList.add("error");
			}
		}

		socket.addEventListener("close", () => {
			WSStatusElement.textContent = "Disconnected";
			WSStatusElement.classList.remove("success");
			WSStatusElement.classList.add("error");
			retryConnection();
		});
		document.addEventListener("blur", () => {
			sendNotifications = true;
		});
		document.addEventListener("focus", () => {
			sendNotifications = false;
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

	fetchMessages();
	scrollToBottom();
	document.querySelector("#messageinput").focus();
	document.querySelector("#submit").addEventListener("click", sendMessage);
	document
		.querySelector("#messageinput")
		.addEventListener("keydown", (event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				sendMessage();
			}
		});
	messagesContainer.addEventListener("scroll", () => {
		if (messagesContainer.scrollTop === 0) {
			// Store scroll relative to bottom
			continueScroll =
				messagesContainer.scrollHeight - messagesContainer.scrollTop;

			fetchMessages(continueId);
		}
	});
});
