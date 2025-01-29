class game {
    constructor(allowedDigits, numberLength) {
        this.allowedDigits = allowedDigits;
        this.numberLength = numberLength;
    }
    generateNumber() {
        let number = "";
        for (let i = 0; i < this.numberLength; i++) {
            number += this.allowedDigits[Math.floor(Math.random() * this.allowedDigits.length)];
        }
        return number;
    }
    getPossibleCombinations() {
        // possible combinations formula
    }
    checkNumber(guess) {
        // check digits that match up exactly (split guess into array and generated number into array, compare)
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const sliderProps = {
        fill: "var(--blue), var(--mauve)",
        background: "var(--crust)",
    };
    document.querySelectorAll(".options-slider").forEach((slider) => {
        const title = slider.querySelector(".title");
        const input = slider.querySelector("input");
        if (title == null || input == null) return;
        input.min = slider.getAttribute("data-min");
        input.max = slider.getAttribute("data-max");
        const value = parseInt(input.value);
        const minValue = parseInt(input.min);
        const maxValue = parseInt(input.max);
        const percent = ((value - minValue) / (maxValue - minValue)) * 100;
        const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percent}%, ${sliderProps.background} ${percent + 0.1}%)`;
        input.style.background = bg;
        title.setAttribute("data-value", input.value);
        // change position of slider on startup to config value
        input.addEventListener("input", () => {
            const value = parseInt(input.value);
            const minValue = parseInt(input.min);
            const maxValue = parseInt(input.max);
            const percent = ((value - minValue) / (maxValue - minValue)) * 100;
            const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percent}%, ${sliderProps.background} ${percent + 0.1}%)`;
            input.style.background = bg;
            title.setAttribute("data-value", input.value);
            input.setAttribute("value", input.value);
        });
    });
});
