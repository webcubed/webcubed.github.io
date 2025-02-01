document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#optionscontainer").addEventListener("click", () => {
		updateConfig();
		if (configValues?.twoPlayer) {
			document.querySelector("#customnumberselection").style.display = "block";
		} else {
			document.querySelector("#customnumberselection").style.display = "none";
		}
	});
});
