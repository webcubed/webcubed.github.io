// TODO: config system
const allowedDigits = [1, 2, 3, 4, 5, 6];
let configValues;
const updateConfig = () => {
	configValues = {
		numberLength: document.querySelector("#maxdigits").value,
		enforcenumberlength: document.querySelector("#enforcenumberlength").checked,
		twoPlayer: document.querySelector("#twoplayermode").checked,
		showCorrectPositions: document.querySelector("#showcorrectpositions")
			.checked,
		allowRepeats: document.querySelector("#allowrepeats").checked,
		showPreviousGuesses: document.querySelector("#showpreviousguesses").checked,
		shownumpossiblecombinations: document.querySelector(
			"#shownumpossiblecombinations"
		).checked,
	};
};

let game;
let numberLength = 6;
let number;
const customnumber = [];
let gameinsession = false;
// Factorial calculation
const f = [];
function factorial(n) {
	if (n === 0 || n === 1) return 1;
	if (f[n] > 0) return f[n];
	return (f[n] = factorial(n - 1) * n);
}
// Let page work offline

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			// .register("serviceworker.js")
			.register("../sw.js")
			.then((registration) => {
				// Registration was successful
				console.log(
					"ServiceWorker registration successful with scope:",
					registration.scope
				);
				new Toast(
					"success",
					"ServiceWorker Registered",
					"ServiceWorker has been registered successfully. (You can probably use this website offline now!)",
					2500
				);
			})
			.catch((error) => {
				// Registration failed :(
				console.log("ServiceWorker registration failed:", error);
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
		for (let i = 0; i < Number.parseInt(this.numberLength); i++) {
			const index = Math.floor(Math.random() * possibleDigits.length);
			number += possibleDigits[index];
			if (
				!configValues.allowRepeats &&
				Number.parseInt(this.numberLength) <=
					Number.parseInt(this.allowedDigits.length)
			) {
				possibleDigits.splice(index, 1);
			} else if (number.length === Number.parseInt(this.numberLength)) {
				document.querySelector("#allowrepeats").checked = true;
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
		// Possible combinations formula
		// length of allowed digits array = possible combination for 1 digit
		// for the second digit, the possible amount of combinations
		// is each item in array * length of array, which is the possible combination for 2 digits
		// in other words, length of array squared = possible combinations for 2 digits
		// following this pattern, the possible combinations for n digits is length of array to the power of n
		// some rando on github is probably gonna see this and go man this guy is stupid he probably didn't pass middle school yet
		if (configValues.allowRepeats) {
			return this.allowedDigits.length ** this.numberLength;
		} else {
			let a = 1;
			for (let i = 0; i < Number.parseInt(this.numberLength); i++) {
				a *= this.allowedDigits.length - i;
				if (i === Number.parseInt(this.numberLength) - 1) return a.toString();
			}
		}

		// account for non-repeating digits; which theoretically is just the factorial of the allowed digits
		// the first digit can be anything so it's just allowedDigits
		// second digit is that times allowedDigits - 1
		// now one of two things will happen
		// don't allow repeats means that the amount of possible digits must be greater than or equal to the number length
		// so this must iterate until no more
		// ex. 6 digits 6 possible
		// 6*5*4*3*2*1
		// ex 6 digits 9 possible
		// 9*7*6*5*4*3
	}

	checkNumber(guess) {
		// Should only be run after number generation
		// check digits that match up exactly (split guess into array and generated number into array, compare)
		// split guess into array
		const guessArray = guess.split("");
		// Split generated number into array
		const generatedNumberArray = number.split(""); // To be changed
		// compare arrays
		let correctDigits = 0;
		for (const [i, element] of guessArray.entries()) {
			if (element === generatedNumberArray[i]) {
				correctDigits++;
			}
		}

		return correctDigits;
	}
}
document.addEventListener("DOMContentLoaded", () => {
	configValues = {
		numberLength: document.querySelector("#maxdigits").value,
		twoPlayer: document.querySelector("#twoplayermode").checked,
		showCorrectPositions: document.querySelector("#showcorrectpositions")
			.checked,
		enforcenumberlength: document.querySelector("#enforcenumberlength").checked,
		allowRepeats: document.querySelector("#allowrepeats").checked,
		showPreviousGuesses: document.querySelector("#showpreviousguesses").checked,
		shownumpossiblecombinations: document.querySelector(
			"#shownumpossiblecombinations"
		).checked,
	};
	numberLength = configValues.numberLength ? configValues.numberLength : 6;

	const guessElement = document.querySelector("#guess");
	const submitElement = document.querySelector("#submit");
	/* ---------------------- settings toggle functionality --------------------- */
	document.querySelector("#settingsbutton").addEventListener("click", () => {
		document.querySelector("#optionscontainer").style.display =
			document.querySelector("#optionscontainer").style.display === "none"
				? "flex"
				: "none";
	});
	/* -------------------------- slider functionality -------------------------- */
	const sliderProperties = {
		fill: "var(--blue), var(--mauve)",
		background: "var(--crust)",
	};
	for (const slider of document.querySelectorAll(".options-slider")) {
		const title = slider.querySelector(".title");
		const input = slider.querySelector("input");
		if (title == null || input == null) {
			continue;
		}

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
			// Set global number length value
			numberLength = value;
		});
	}

	/* -------------------------- button functionality -------------------------- */
	for (const button of document.querySelectorAll(
		"#digitselection > button.digitbutton"
	)) {
		// Highlight buttons with values included in alloweddigits
		if (allowedDigits.includes(Number.parseInt(button.textContent))) {
			button.classList.add("active");
		}

		button.addEventListener("click", () => {
			const value = button.textContent;
			// Highlight button
			// check if number is in alloweddigits
			if (allowedDigits.includes(Number.parseInt(value))) {
				button.classList.remove("active");
				// Remove value from array
				allowedDigits.splice(allowedDigits.indexOf(Number.parseInt(value)), 1);
			} else {
				button.classList.add("active");
				// Add to array
				allowedDigits.push(Number.parseInt(value));
				// Re sort array
				allowedDigits.sort((a, b) => a - b);
			}
		});
	}

	// Hide custom number selector if 2 player mode off
	if (configValues.twoPlayer === false) {
		document.querySelector("#customnumberselection").style.display = "none";
	} else {
		document.querySelector("#customnumberselection").style.display = "block";
	}

	// This check is continuously done on click of options container in events.js
	/* --------------------------- input functionality -------------------------- */
	guessElement.addEventListener("input", (event) => {
		// Cancel event if greater than generated number length or contains non-allowed digits
		const guess = guessElement.value;
		const key = event.data;
		if (!key) {
			return;
		}

		if (
			guess.length > game.numberLength ||
			!allowedDigits.includes(Number.parseInt(key))
		) {
			// Remove last character from input
			guessElement.value = guess.slice(0, -1);
		}
	});
	// Make enter submit guess if the input is active
	guessElement.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			submitElement.click();
		}
	});
	/* ------------------------ submission functionality ------------------------ */
	submitElement.addEventListener("click", () => {
		// Return if nothing in input
		if (guessElement.value === "") {
			return;
		}

		// Return if guess contains repeat digits and allowrepeats is on
		if (
			!configValues.allowRepeats &&
			new Set(guessElement.value).size !== guessElement.value.length
		) {
			new Toast(
				"warning",
				"Repeats",
				"Repeats are not allowed in this game.",
				2500
			);
			return;
		}

		// Return if guess is under number length AND enforcenumberlength is enabled
		if (
			guessElement.value.length < game.numberLength &&
			configValues.enforcenumberlength
		) {
			new Toast(
				"warning",
				"Number length",
				"Enforce number length is on. Guess must be " +
					game.numberLength +
					" digits long.",
				2500
			);
			return;
		}

		updateConfig();
		const guess = guessElement.value;
		game.guesses.push(guess);
		const correctDigits = game.checkNumber(guess);
		const row = document.createElement("tr");
		let correctPositions = "";
		if (configValues.showCorrectPositions) {
			// Split guess into array and compare against generated number
			const guessArray = guess.split("");
			const generatedNumberArray = number.split("");

			// For the ones that don't match up, set as -
			// for the ones that do match up, set as is
			for (let i = 0; i < guessArray.length; i++) {
				if (guessArray[i] !== generatedNumberArray[i]) {
					guessArray[i] = "-";
				}
			}

			// Join array into string
			correctPositions = guessArray.join("");
		}

		row.innerHTML = configValues.showCorrectPositions
			? `<td>${guess}</td><td>${correctDigits}</td><td>${correctPositions}</td>`
			: `<td>${guess}</td><td>${correctDigits}</td>`;

		document.querySelector("#guessbody").append(row);
		// Auto scroll to bottom if overflow
		const table = document.querySelector("#guessbody");

		// Fallback for browsers without smooth scroll
		const start = table.scrollTop;
		const change = table.scrollHeight - start;
		const duration = 500; // Duration in ms
		let currentTime = 0;
		const increment = 20;
		Math.easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) {
				return (c / 2) * t * t + b;
			}

			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		function animateScroll() {
			currentTime += increment;
			const value = Math.easeInOutQuad(currentTime, start, change, duration);
			table.scrollTop = value;
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
		if (
			correctDigits === Number.parseInt(game.numberLength) ||
			guess === number ||
			correctDigits == game.numberLength ||
			guess == number
		) {
			/* -------------------------------------------------------------------------- */
			/*                                 game over!!                                */
			/* -------------------------------------------------------------------------- */
			// restore visibility of custom number selection
			// highlight each button in correspondance to the custom number array
			for (const button of document.querySelectorAll(
				"#customnumberselection > button.digitbutton"
			)) {
				if (
					customnumber.includes(Number.parseInt(button.textContent)) &&
					!button.classList.contains("active")
				) {
					button.classList.add("active");
				} else {
					button.classList.remove("active");
				}
			}

			new Toast(
				"info",
				"Game Over!",
				"You have correctly guessed the number after" +
					" " +
					game.guesses.length +
					" " +
					"guesses!",
				5000
			);
			// Re enable options
			document.querySelector("#optionscontainer").style.pointerEvents = "all";
			document.querySelector("#optionscontainer").style.cursor = "unset";
			guessElement.disabled = true;
			guessElement.value = "";
			gameinsession = false;
			guessElement.placeholder = "No game in session";
			document.querySelector("#possiblecombinations").textContent =
				"Possible Combinations: N/A";
			document.querySelector("#startbutton").textContent = "New Game";
			document.querySelector("#startbutton").style.backgroundColor =
				"var(--blue)";
		}
	});
	/* --------------------- number selection functionality --------------------- */
	for (const button of document.querySelectorAll(
		"#customnumberselection > button.digitbutton"
	)) {
		button.addEventListener("click", () => {
			const value = button.textContent;
			// Highlight button
			// check if number is in alloweddigits
			if (
				!allowedDigits.includes(Number.parseInt(value)) ||
				customnumber.includes(Number.parseInt(value))
			) {
				button.classList.remove("active");
				// Remove the number from customnumber array
				customnumber.splice(customnumber.indexOf(Number.parseInt(value)), 1);
			} else {
				button.classList.add("active");
				customnumber.push(Number.parseInt(value));
			}
		});
	}

	/* -------------------------------------------------------------------------- */
	/*                                 game start                                 */
	/* -------------------------------------------------------------------------- */
	document.querySelector("#startbutton").addEventListener("click", () => {
		if (gameinsession === false) {
			game = new Game(allowedDigits, numberLength);
			if (configValues.twoPlayer) {
				for (const button of document.querySelectorAll(
					"#customnumberselection > button.digitbutton"
				)) {
					if (!button.classList.contains("active")) {
						button.classList.add("active");
					}
				}

				number = customnumber.join("");
				new Toast(
					"info",
					"Game started",
					"All items in custom number selection now appear active for hiding purposes.",
					2500
				);
			} else {
				number = game.generateNumber();
			}

			if (configValues.shownumpossiblecombinations) {
				document.querySelector("#possiblecombinations").textContent =
					"Possible Combinations: " + game.calculatePossibleCombinations();
			} else {
				document.querySelector("#possiblecombinations").textContent =
					"Possible Combinations: N/A";
			}

			if (configValues.showCorrectPositions) {
				// Create a heading in the guess table titled "Correct Possitions"
				if (!document.querySelector("#correctpositionsheader")) {
					const heading = document.createElement("th");
					heading.textContent = "Correct Positions";
					heading.id = "correctpositionsheader";
					document
						.querySelector("#previousguesses")
						.children[0].children[0].append(heading);
				}
			} else if (document.querySelector("#correctpositionsheader")) {
				// Remove the element if present
				document.querySelector("#correctpositionsheader").remove();
			}

			// Disable options until game over
			document.querySelector("#optionscontainer").style.pointerEvents = "none";
			document.querySelector("#optionscontainer").style.cursor = "not-allowed";
			new Toast(
				"info",
				"Game started",
				"Options are now disabled until game over",
				2500
			);
			// Clear guess table
			document.querySelector("#guessbody").innerHTML = "";
			// Clear submission field
			guessElement.value = "";
			gameinsession = true;
			guessElement.disabled = false;
			guessElement.placeholder = "Enter your guess";
			// Change start button to be red background and say end game
			document.querySelector("#startbutton").textContent = "End Game";
			document.querySelector("#startbutton").style.backgroundColor =
				"var(--red) !important";
		} else {
			// End game
			// Restore visibility of custom number selection
			// highlight each button in correspondance to the custom number array
			for (const button of document.querySelectorAll(
				"#customnumberselection > button.digitbutton"
			)) {
				if (
					customnumber.includes(Number.parseInt(button.textContent)) &&
					!button.classList.contains("active")
				) {
					button.classList.add("active");
				} else {
					button.classList.remove("active");
				}
			}

			new Toast(
				"info",
				"Game Over!",
				"You have failed to correctly guess the number! The correct answer was: " +
					" " +
					number +
					"!" +
					" Better luck next time!",
				5000
			);
			// Re enable options
			document.querySelector("#optionscontainer").style.pointerEvents = "all";
			document.querySelector("#optionscontainer").style.cursor = "unset";
			guessElement.disabled = true;
			guessElement.value = "";
			gameinsession = false;
			guessElement.placeholder = "No game in session";
			document.querySelector("#possiblecombinations").textContent =
				"Possible Combinations: N/A";
			document.querySelector("#startbutton").textContent = "New Game";
			document.querySelector("#startbutton").style.backgroundColor =
				"var(--blue) !important";
		}
	});
	// Add TOOLTIPS!!!
	new Tooltip(
		document.querySelector("#startbutton"),
		"follow-bottom",
		"Start Game"
	);
	new Tooltip(
		document.querySelector("#enforcenumberlength").parentNode,
		"follow-right",
		"Enforce number length (Will not allow submissions under specified number length)"
	);
	new Tooltip(
		document.querySelector("#twoplayermode").parentNode,
		"follow-right",
		"Two Player Mode (Will not allow custom number selection)"
	);
	new Tooltip(
		document.querySelector("#showcorrectpositions").parentNode,
		"follow-right",
		"Will create a column for showing correct positions (- = incorrect, # = correct position). This setting is better left off unless you are really bad at this game"
	);
	new Tooltip(
		document.querySelector("#shownumpossiblecombinations").parentNode,
		"follow-right",
		"Will display the number of possible combinations for the game on start. Formula: # of allowed digits ^ number length"
	);
	new Tooltip(
		document.querySelector("#allowrepeats").parentNode,
		"follow-right",
		"Will allow the same digit to be used multiple times in both a guess and generated number. Functionality for two player mode has not been implemented yet."
	);
	new Tooltip(
		document.querySelector("#refreshbutton"),
		"follow-bottom",
		"(Force) Refreshes the page (not reccomended if offline, but helps remove old cache in order to update the website)"
	);
});
