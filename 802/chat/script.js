if (!localStorage.getItem("code")) {
	globalThis.location.href = `${globalThis.location.origin}/chat/auth`;
}

function sendMessage() {
	const message = document.querySelector("#messageinput").value;
	const messageElement = document.createElement("div");
	messageElement.className = "message myMessage";
	messageElement.innerHTML = message;
	document.querySelector("#messages").append(messageElement);
	fetch("https://recline-backend.vercel.com/sendMessage", {
		method: "POST",
		body: message,
	})
		.then((response) => response.json())
		.then((data) => {
			const responseElement = document.createElement("div");
			responseElement.className = "message";
			responseElement.innerHTML = data.response;
			document.querySelector("#messages").append(responseElement);
		});
}
