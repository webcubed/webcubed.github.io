// "Borowed" code
function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const participants = [];
	const interactedParticipants = [];

	document.querySelector("#submitplayers").addEventListener("click", () => {
		const playerCount = document.querySelector("#playercount").value;
		for (let i = 0; i < playerCount; i++) {
			const data = {
				id: i,
				alleles: ["L", "l", "L", "l"],
			};
			participants.push(data);
		}
	});
	function doTrial() {
		// Main player is player id 0.
		// Pair with random player, and push to array named "interactedParticipants"
		const randomIndex = Math.floor(Math.random() * participants.length);
		const randomPlayer = participants[randomIndex];
		const mainPlayer = participants[0];
		interactedParticipants.push(randomPlayer.id);
		const mainPlayerAlleles = shuffle(mainPlayer.alleles);
		const randomPlayerAlleles = shuffle(randomPlayer.alleles);
		// Combination
		// Main player puts down top card, and random player puts down top card.
		const mainPlayerCard = mainPlayerAlleles.pop();
		const randomPlayerCard = randomPlayerAlleles.pop();
		const combination = [mainPlayerCard, randomPlayerCard];
	}
});
