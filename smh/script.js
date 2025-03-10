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
