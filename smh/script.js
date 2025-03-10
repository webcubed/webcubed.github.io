// eslint-disable-next-line no-unused-vars
async function promptForUpdate() {
	const dialog = document.createElement("dialog");
	dialog.innerHTML = `
	<p>A new version of this site is available. Reload to update?</p>
	<button id="confirm">Confirm</button>
	<button id="cancel">Cancel</button>
	`;
	document.body.append(dialog);
	dialog.showModal();

	const confirmButton = dialog.querySelector("#confirm");
	const cancelButton = dialog.querySelector("#cancel");
	const result = new Promise((resolve) => {
		confirmButton.addEventListener("click", () => {
			dialog.close();
			resolve(true);
		});

		cancelButton.addEventListener("click", () => {
			dialog.close();
			resolve(false);
		});
	});
	return result;
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#idinput").value =
		"1fc79e20-1483-4528-854d-cbb776111132"; // Update here (find "refId" in parent of fetch)
	document.querySelector("#submit").addEventListener("click", () => {
		window.open(
			"https://www.hmhco.com/ui/#/assignments/review/" +
				document.querySelector("#idinput").value
		);
	});
});
