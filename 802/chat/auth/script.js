const apiBaseUrl = "https://recline-backend.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector("#submitbutton")
		.addEventListener("click", async () => {
			const email = document.querySelector("#emailinput").value;
			const name = document.querySelector("#nameinput").value;
			localStorage.setItem("email", email);
			document.querySelector("#checkbutton").disabled = false;
			const codeRequest = await fetch(`${apiBaseUrl}/genCode`, {
				method: "POST",
				body: JSON.stringify({ account: email, name }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then((response) => response.json());
			const code = codeRequest.code;
			document.querySelector("#codedisplay").textContent = code;
			// Store code into localstorage
			localStorage.setItem("code", code);
		});
	document.querySelector("#checkbutton").addEventListener("click", async () => {
		const code = localStorage.getItem("code");
		const response = await fetch(`${apiBaseUrl}/check`, {
			method: "POST",
			body: JSON.stringify({ account: localStorage.getItem("email"), code }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => response.text());
		if (response === "authorized :>") {
			globalThis.location.href = `${globalThis.location.origin}/802/chat`;
		}
	});
	document.querySelector("#title").addEventListener("click", () => {
		localStorage.setItem("email", document.querySelector("#emailinput").value);
		localStorage.setItem("code", document.querySelector("#nameinput").value);
	});
});
