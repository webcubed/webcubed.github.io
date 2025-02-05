document.addEventListener("DOMContentLoaded", function () {
	/* -------------------------- slider functionality -------------------------- */
	const sliderProperties = {
		fill: "var(--blue), var(--mauve)",
		background: "var(--crust)",
	};
	for (const slider of document.querySelectorAll(".options-slider")) {
		const title = slider.querySelector(".title");
		const input = slider.querySelector("input");
		if (title === null || input === null) continue;
		input.min = slider.dataset.min;
		input.max = slider.dataset.max;
		const value = Number.parseInt(input.value);
		const minValue = Number.parseInt(input.min);
		const maxValue = Number.parseInt(input.max);
		const percent = ((value - minValue) / (maxValue - minValue)) * 100;
		const bg = `linear-gradient(90deg, ${sliderProperties.fill} ${percent}%, ${sliderProperties.background} ${percent + 0.1}%)`;
		input.style.background = bg;
		title.dataset.value = input.value;
		// Change position of slider on startup to config value
		input.addEventListener("input", () => {
			const value = Number.parseInt(input.value);
			const minValue = Number.parseInt(input.min);
			const maxValue = Number.parseInt(input.max);
			const percent = ((value - minValue) / (maxValue - minValue)) * 100;
			const bg = `linear-gradient(90deg, ${sliderProperties.fill} ${percent}%, ${sliderProperties.background} ${percent + 0.1}%)`;
			input.style.background = bg;
			title.dataset.value = input.value;
			input.setAttribute("value", input.value);
			// Your logic
		});
	}
});
