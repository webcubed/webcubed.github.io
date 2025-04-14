document.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector("#submitbutton")
		.addEventListener("click", async () => {
			const email = document.querySelector("#emailinput").value;
			document.querySelector("#codedisplay").textContent = email;
			document.querySelector("#checkbutton").disabled = false;
			const codeRequest = await fetch(
				`https://recline-backend.vercel.com/genCode`,
				{
					method: "POST",
					body: email,
					headers: {
						"Content-Type": "text/plain",
					},
				}
			).then((response) => response.json());
			const code = codeRequest.code;
			document.querySelector("#codedisplay").textContent = code;
			// Store code into localstorage
			localStorage.setItem("code", code);
		});
	document.querySelector("#checkbutton").addEventListener("click", async () => {
		const code = localStorage.getItem("code");
		const response = await fetch(`https://recline-backend.vercel.com/check`, {
			method: "POST",
			body: code,
			headers: {
				"Content-Type": "text/plain",
			},
		}).then((response) => response.text());
		if (response === "authorized :>") {
			globalThis.location.href = `${globalThis.location.origin}/chat`;
		}
	});
});
