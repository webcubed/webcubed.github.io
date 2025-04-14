document.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector("#submitbutton")
		.addEventListener("click", async () => {
			const email = document.querySelector("#emailinput").value;
			const name = document.querySelector("#nameinput").value;
			localStorage.setItem("email", email);
			document.querySelector("#codedisplay").textContent = email;
			document.querySelector("#checkbutton").disabled = false;
			const codeRequest = await fetch(
				`https://recline-backend.vercel.app/genCode`,
				{
					method: "POST",
					body: { account: email, name },
					headers: {
						"Content-Type": "application/json",
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
		const response = await fetch(`https://recline-backend.vercel.app/check`, {
			method: "POST",
			body: { account: localStorage.getItem("email"), code },
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => response.text());
		if (response === "authorized :>") {
			globalThis.location.href = `${globalThis.location.origin}/chat`;
		}
	});
});
