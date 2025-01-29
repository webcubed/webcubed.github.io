let allowedDigits = [1, 2, 3, 4, 5, 6];
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
    /* -------------------------- slider functionality -------------------------- */
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
    /* -------------------------- button functionality -------------------------- */
    document.querySelectorAll("button.digitbutton").forEach((button) => {
        // highlight buttons with values included in alloweddigits
        if (allowedDigits.includes(parseInt(button.textContent))) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            const value = button.textContent;
            // highlight button
            // check if number is in alloweddigits
            if (allowedDigits.includes(parseInt(value))) {
                button.classList.remove("active");
                // remove value from array
                allowedDigits.splice(allowedDigits.indexOf(parseInt(value)), 1);
                return;
            } else {
                button.classList.add("active");
                // add to array
                allowedDigits.push(parseInt(value));
                // re sort array
                allowedDigits.sort(function (a, b) {
                    return a - b;
                });
                return;
            }
        });
    });
});
