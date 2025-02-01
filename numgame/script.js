//tbd: config system
let allowedDigits = [1, 2, 3, 4, 5, 6];
var configValues;
var updateConfig = () => {
    configValues = {
        numberLength: document.getElementById("maxdigits").value,
        enforcenumberlength: document.getElementById("enforcenumberlength").checked,
        twoPlayer: document.getElementById("twoplayermode").checked,
        showCorrectPositions: document.getElementById("showcorrectpositions").checked,
        allowRepeats: document.getElementById("allowrepeats").checked,
        showPreviousGuesses: document.getElementById("showpreviousguesses").checked,
        shownumpossiblecombinations: document.getElementById("shownumpossiblecombinations").checked,
    };
};
let game;
let numberLength = 6;
let number;
let customnumber = [];
let gameinsession = false;
// let page work offline
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            //.register("serviceworker.js")
            .register("../sw.js")
            .then((registration) => {
                // Registration was successful
                console.log("ServiceWorker registration successful with scope: ", registration.scope);
                new Toast(
                    "success",
                    "ServiceWorker Registered",
                    "ServiceWorker has been registered successfully. (You can probably use this website offline now!)",
                    2500
                );
            })
            .catch((err) => {
                // registration failed :(
                console.log("ServiceWorker registration failed: ", err);
            });
    });
}

class Game {
    constructor(allowedDigits, numberLength) {
        this.allowedDigits = allowedDigits;
        this.numberLength = numberLength;
        this.guesses = [];
    }
    generateNumber() {
        let number = "";
        const possibleDigits = this.allowedDigits.slice();
        for (let i = 0; i < this.numberLength; i++) {
            let index = Math.floor(Math.random() * possibleDigits.length);
            number += possibleDigits[index];
            if (!configValues.allowRepeats || parseInt(this.numberLength) > parseInt(this.allowedDigits.length)) {
                possibleDigits.splice(index, 1);
            } else {
                document.getElementById("allowrepeats").checked = true;
                configValues.allowRepeats = true;
                new Toast(
                    "warning",
                    "Repeats Allowed",
                    "Repeats are allowed in this game. This is usually because the amount of possible digits was less than the Number Length.",
                    5000
                );
            }
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
        // should only be run after number generation
        // check digits that match up exactly (split guess into array and generated number into array, compare)
        // split guess into array
        const guessArray = guess.split("");
        // split generated number into array
        const generatedNumberArray = number.split(""); //to be changed
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
    configValues = {
        numberLength: document.getElementById("maxdigits").value,
        twoPlayer: document.getElementById("twoplayermode").checked,
        showCorrectPositions: document.getElementById("showcorrectpositions").checked,
        enforcenumberlength: document.getElementById("enforcenumberlength").checked,
        allowRepeats: document.getElementById("allowrepeats").checked,
        showPreviousGuesses: document.getElementById("showpreviousguesses").checked,
        shownumpossiblecombinations: document.getElementById("shownumpossiblecombinations").checked,
    };
    numberLength = configValues.numberLength ? configValues.numberLength : 6;

    const guessElement = document.getElementById("guess");
    const submitElement = document.getElementById("submit");
    /* ---------------------- settings toggle functionality --------------------- */
    document.getElementById("settingsbutton").addEventListener("click", () => {
        document.getElementById("optionscontainer").style.display = document.getElementById("optionscontainer").style.display === "none" ? "flex" : "none";
    });
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
            // set global number length value
            numberLength = value;
        });
    });
    /* -------------------------- button functionality -------------------------- */
    document.querySelectorAll("#digitselection > button.digitbutton").forEach((button) => {
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
    // hide custom number selector if 2 player mode off
    if (configValues.twoPlayer === false) {
        document.getElementById("customnumberselection").style.display = "none";
    } else {
        document.getElementById("customnumberselection").style.display = "block";
    }
    // this check is continuously done on click of options container in events.js
    /* --------------------------- input functionality -------------------------- */
    guessElement.addEventListener("input", (event) => {
        // cancel event if greater than generated number length or contains non-allowed digits
        const guess = guessElement.value;
        const key = event.data;
        if (!key) return;
        if (guess.length > game.numberLength || !allowedDigits.includes(parseInt(key))) {
            // remove last character from input
            guessElement.value = guess.slice(0, -1);
            return;
        }
    });
    // make enter submit guess if the input is active
    guessElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            submitElement.click();
        }
    });
    /* ------------------------ submission functionality ------------------------ */
    submitElement.addEventListener("click", () => {
        // return if nothing in input
        if (guessElement.value === "") return;
        // return if guess contains repeat digits and allowrepeats is on
        if (!configValues.allowRepeats && new Set(guessElement.value).size !== guessElement.value.length) {
            new Toast("warning", "Repeats", "Repeats are not allowed in this game.", 2500);
            return;
        }
        // return if guess is under number length AND enforcenumberlength is enabled
        if (guessElement.value.length < game.numberLength && configValues.enforcenumberlength) {
            new Toast("warning", "Number length", "Enforce number length is on. Guess must be " + game.numberLength + " digits long.", 2500);
            return;
        }
        updateConfig();
        const guess = guessElement.value;
        game.guesses.push(guess);
        const correctDigits = game.checkNumber(guess);
        const row = document.createElement("tr");
        var correctPositions = "";
        if (configValues.showCorrectPositions) {
            // split guess into array and compare against generated number
            const guessArray = guess.split("");
            const generatedNumberArray = number.split("");

            // for the ones that don't match up, set as -
            // for the ones that do match up, set as is
            for (let i = 0; i < guessArray.length; i++) {
                if (guessArray[i] !== generatedNumberArray[i]) {
                    guessArray[i] = "-";
                }
            }
            // join array into string
            correctPositions = guessArray.join("");
        }
        if (configValues.showCorrectPositions) {
            row.innerHTML = `<td>${guess}</td><td>${correctDigits}</td><td>${correctPositions}</td>`;
        } else {
            row.innerHTML = `<td>${guess}</td><td>${correctDigits}</td>`;
        }
        document.getElementById("guessbody").appendChild(row);
        // Auto scroll to bottom if overflow
        const table = document.getElementById("guessbody");

        // Fallback for browsers without smooth scroll
        let start = table.scrollTop;
        const change = table.scrollHeight - start;
        const duration = 500; // duration in ms
        let currentTime = 0;
        const increment = 20;
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        function animateScroll() {
            currentTime += increment;
            const val = Math.easeInOutQuad(currentTime, start, change, duration);
            table.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        }
        animateScroll();

        // Easing function

        // if guess matches the number, game ends and resets; disable guess input
        // correctDigits = int
        // game.numberLength = string
        // guess = string
        // number = string
        if (correctDigits === parseInt(game.numberLength) || guess === number || correctDigits == game.numberLength || guess == number) {
            /* -------------------------------------------------------------------------- */
            /*                                 game over!!                                */
            /* -------------------------------------------------------------------------- */
            // restore visibility of custom number selection
            // highlight each button in correspondance to the custom number array
            document.querySelectorAll("#customnumberselection > button.digitbutton").forEach((button) => {
                if (customnumber.includes(parseInt(button.textContent)) && !button.classList.contains("active")) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
            new Toast("info", "Game Over!", "You have correctly guessed the number after" + " " + game.guesses.length + " " + "guesses!", 5000);
            // re enable options
            document.getElementById("optionscontainer").style.pointerEvents = "all";
            document.getElementById("optionscontainer").style.cursor = "unset";
            guessElement.disabled = true;
            guessElement.value = "";
            gameinsession = false;
            guessElement.placeholder = "No game in session";
            document.getElementById("possiblecombinations").innerText = "Possible Combinations: ";
        }
    });
    /* --------------------- number selection functionality --------------------- */
    document.querySelectorAll("#customnumberselection > button.digitbutton").forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            // highlight button
            // check if number is in alloweddigits
            if (!allowedDigits.includes(parseInt(value)) || customnumber.includes(parseInt(value))) {
                button.classList.remove("active");
                // remove the number from customnumber array
                customnumber.splice(customnumber.indexOf(parseInt(value)), 1);
                return;
            } else {
                button.classList.add("active");
                customnumber.push(parseInt(value));
                return;
            }
        });
    });
    /* -------------------------------------------------------------------------- */
    /*                                 game start                                 */
    /* -------------------------------------------------------------------------- */
    document.getElementById("startbutton").addEventListener("click", () => {
        game = new Game(allowedDigits, numberLength);
        if (!configValues.twoPlayer) {
            number = game.generateNumber();
        } else {
            document.querySelectorAll("#customnumberselection > button.digitbutton").forEach((button) => {
                if (!button.classList.contains("active")) {
                    button.classList.add("active");
                }
            });
            number = customnumber.join("");
            new Toast("info", "Game started", "All items in custom number selection now appear active for hiding purposes.", 2500);
        }
        if (configValues.shownumpossiblecombinations) {
            document.getElementById("possiblecombinations").innerText = "Possible Combinations: " + game.calculatePossibleCombinations();
        }
        if (configValues.showCorrectPositions) {
            // create a heading in the guess table titled "Correct Possitions"
            if (!document.getElementById("correctpositionsheader")) {
                const heading = document.createElement("th");
                heading.innerText = "Correct Positions";
                heading.id = "correctpositionsheader";
                document.getElementById("previousguesses").children[0].children[0].appendChild(heading);
            }
        } else {
            // remove the element if present
            if (document.getElementById("correctpositionsheader")) {
                document.getElementById("correctpositionsheader").remove();
            }
        }
        // disable options until game over
        document.getElementById("optionscontainer").style.pointerEvents = "none";
        document.getElementById("optionscontainer").style.cursor = "not-allowed";
        new Toast("info", "Game started", "Options are now disabled until game over", 2500);
        // clear guess table
        document.getElementById("guessbody").innerHTML = "";
        // clear submission field
        guessElement.value = "";
        gameinsession = true;
        guessElement.disabled = false;
        guessElement.placeholder = "Enter your guess";
    });
    // add TOOLTIPS!!!
    new Tooltip(document.getElementById("startbutton"), "follow-bottom", "Start Game");
    new Tooltip(
        document.getElementById("enforcenumberlength").parentNode,
        "follow-right",
        "Enforce number length (Will not allow submissions under specified number length)"
    );
    new Tooltip(document.getElementById("twoplayermode").parentNode, "follow-right", "Two Player Mode (Will not allow custom number selection)");
    new Tooltip(
        document.getElementById("showcorrectpositions").parentNode,
        "follow-right",
        "Will create a column for showing correct positions (- = incorrect, # = correct position). This setting is better left off unless you are really bad at this game"
    );
    new Tooltip(
        document.getElementById("shownumpossiblecombinations").parentNode,
        "follow-right",
        "Will display the number of possible combinations for the game on start. Formula: # of allowed digits ^ number length"
    );
    new Tooltip(
        document.getElementById("allowrepeats").parentNode,
        "follow-right",
        "Will allow the same digit to be used multiple times in both a guess and generated number. Functionality for two player mode has not been implemented yet."
    );
    new Tooltip(
        document.getElementById("refreshbutton"),
        "follow-bottom",
        "(Force) Refreshes the page (not reccomended if offline, but helps remove old cache in order to update the website)"
    );
});
