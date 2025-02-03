function createCanvas(result) {
	const canvas = document.querySelector("#result");
	const context = canvas.getContext("2d");
	context.font = "20px Lexend";
	context.fillStyle = "var(--text)";
	context.fillText(result, 0, 20);
	return canvas;
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#input").addEventListener("input", function (event) {
		createCanvas(event.target.value);
	});
});
