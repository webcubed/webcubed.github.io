const apiBaseUrl = "https://recline-backend.vercel.app";
async function checkSession() {
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
}

await checkSession();
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
