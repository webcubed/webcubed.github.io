//tbd: config system
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
    calculatePossibleCombinations() {
        // possible combinations formula
        // length of allowed digits array = possible combination for 1 digit
        // for the second digit, the possible amount of combinations
        // is each item in array * length of array, which is the possible combination for 2 digits
        // in other words, length of array squared = possible combinations for 2 digits
        // following this pattern, the possible combinations for n digits is length of array to the power of n
        // some rando on github is probably gonna see this and go man this guy is stupid he probably didn't pass middle school yet
        
        return this.allowedDigits.length ** this.numberLength;
    }
    checkNumber(guess) {
        // check digits that match up exactly (split guess into array and generated number into array, compare)
        // split guess into array
        const guessArray = guess.split("");
        // split generated number into array
        const generatedNumberArray = this.generateNumber().split(""); //to be changed
        // compare arrays
        let correctDigits = 0;
        for (let i = 0; i < guessArray.length; i++) {
            if (guessArray[i] === generatedNumberArray[i]) {
                correctDigits++;
            }
        }
        return correctDigits;
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
    /* --------------------------- input functionality -------------------------- */
    document.getElementById("guess").addEventListener("input", () => {
        // cancel event if greater than generated number length or contains non-allowed digits
        const guess = document.getElementById("guess").value;
        if (guess.length > game.numberLength || !allowedDigits.includes(parseInt(guess))) {
            document.getElementById("guess").value = "";
            return;
        }
    });
    /* ------------------------ submission functionality ------------------------ */
    document.getElementById("submit").addEventListener("click", () => {
        const guess = document.getElementById("guess").value;
        const correctDigits = game.checkNumber(guess);
        const row = document.createElement("tr");
        row.innerHTML = `<td>${guess}</td><td>${correctDigits}</td>`;
        document.getElementById("guessbody").appendChild(row);
    });
});
