const apiBaseUrl = "https://recline-backend.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const revidElement = document.querySelector("#revid");
		const versionResponse = await fetch("/version.txt");
		const versionText = await versionResponse.text();

		revidElement.textContent = versionText.slice(0, 7);
		revidElement.title = `Commit SHA: ${versionText}`;
		revidElement.href = `https://github.com/webcubed/webcubed.github.io/commit/${versionText}`;
	} catch {
		revidElement.textContent = "dev";
		revidElement.title = "This is a development version of the site.";
		revidElement.classList.add("dev");
		return;
	}

	document
		.querySelector("#submitbutton")
		.addEventListener("click", async () => {
			const email = document.querySelector("#emailinput").value;
			const name = document.querySelector("#nameinput").value;
			localStorage.setItem("email", email);
			document.querySelector("#checkbutton").disabled = false;
			const codeResponse = await fetch(`${apiBaseUrl}/genCode`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					account: email,
					name,
				},
			});
			const codeRequest = await codeResponse.json();
			if (codeRequest.error) {
				new Toast("error", codeRequest.error, codeRequest.error, 7500);
				return;
			}

			const { code } = codeRequest;
			document.querySelector("#codedisplay").textContent = code;
			// Store code into localstorage
			localStorage.setItem("code", code);
		});
	document.querySelector("#checkbutton").addEventListener("click", async () => {
		const code = localStorage.getItem("code");
		const checkResponse = await fetch(`${apiBaseUrl}/check`, {
			method: "GET",
			headers: {
				account: localStorage.getItem("email"),
				code,
			},
		});
		const response = await checkResponse.text();
		if (response === "authorized :>") {
			globalThis.location.href = `${globalThis.location.origin}/802/chat`;
		}
	});
	document.querySelector("#title").addEventListener("click", () => {
		localStorage.setItem("email", document.querySelector("#emailinput").value);
		localStorage.setItem("code", document.querySelector("#nameinput").value);
	});
});
