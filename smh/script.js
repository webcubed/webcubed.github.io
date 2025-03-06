// eslint-disable-next-line no-unused-vars
function promptForUpdate() {
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
	return new Promise((resolve) => {
		confirmButton.addEventListener("click", () => {
			dialog.close();
			resolve(true);
		});

		cancelButton.addEventListener("click", () => {
			dialog.close();
			resolve(false);
		});
	});
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#idinput").value =
		"bb26a098-ea05-4930-84aa-9fc9062e0dd5"; // Update here
	document.querySelector("#submit").addEventListener("click", () => {
		window.open(
			"https://www.hmhco.com/ui/#/assignments/review/" +
				document.querySelector("#idinput").value
		);
	});
});
