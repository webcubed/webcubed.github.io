const apiBaseUrl = "https://recline-backend.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const revidElement = document.querySelector("#revid");
		// Check for "version" key in localStorage
		let versionResponse;
		let versionText;
		if (localStorage.getItem("version")) {
			versionText = localStorage.getItem("version");
		} else {
			versionResponse = await fetch("/version.txt");
			versionText = await versionResponse.text();
		}

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
	async function updateClientVersion() {
		// Get latest commit hash of repo
		const versionResponse = await fetch("/version.txt", {
			method: "GET",
		});
		const versionText = await versionResponse.text();
		const localVersion = localStorage.getItem("version");
		const revidElement = document.querySelector("#revid");
		if (versionText !== localVersion) {
			revidElement.innerHTML = `${localVersion.split(0, 7)} <span class="red">(outdated)</span>`;
			revidElement.title = `Your version (${localVersion}) is outdated. The latest revision is ${versionText}.`;
		}
	}

	async function updateServerVersion() {
		const serverVersionResponse = await fetch(`${apiBaseUrl}/currentVersion`, {
			method: "GET",
		});
		const serverVersionData = await serverVersionResponse.text();
		// Server rev id
		document.querySelector("#serverrevid").textContent =
			`Server Revision ID: ${serverVersionData.slice(0, 7)}`;
		document.querySelector("#serverrevid").title =
			`Commit SHA: ${serverVersionData}`;
		document.querySelector("#serverrevid").href =
			`https://github.com/webcubed/recline-backend/commit/${serverVersionData}`;
	}

	updateClientVersion();
	updateServerVersion();
});
