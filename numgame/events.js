document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#optionscontainer").addEventListener("click", () => {
		updateConfig();
		if (configValues?.twoPlayer) {
			document.querySelector("#customnumberselection").style.display = "block";
		} else {
			document.querySelector("#customnumberselection").style.display = "none";
		}

		if (configValues.shownumpossiblecombinations) {
			document.querySelector("#possiblecombinations").textContent =
				"Possible Combinations: " + game.calculatePossibleCombinations();
		} else {
			document.querySelector("#possiblecombinations").textContent =
				"Possible Combinations: N/A";
		}
	});
});
