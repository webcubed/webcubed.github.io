/* eslint-disable no-unused-vars */
if (!localStorage.getItem("version")) {
	const versionResponse = await fetch("/version.txt");
	localStorage.setItem("version", await versionResponse.text());
}

async function promptForUpdate() {
	const dialog = document.createElement("dialog");
	dialog.innerHTML = /* html */ `
	<p>A new version of this site is available. Reload to update?</p>
	<button id="confirm">Confirm</button>
	<button id="cancel">Cancel</button>
	`;
	document.body.append(dialog);
	dialog.showModal();

	const confirmButton = dialog.querySelector("#confirm");
	const cancelButton = dialog.querySelector("#cancel");
	const result = new Promise((resolve) => {
		confirmButton.addEventListener("click", async () => {
			dialog.close();
			const response = await fetch("/version.txt");
			localStorage.setItem("version", await response.text());
			resolve(true);
		});

		cancelButton.addEventListener("click", () => {
			dialog.close();
			resolve(false);
		});
	});
	return result;
}

async function promptForNotificationPermission() {
	const dialog = document.createElement("dialog");
	dialog.innerHTML = /* html */ `
	<p>Allow notifications? Click "yes" to recieve a prompt requesting notification permission (accept it pls)</p>
	<button id="confirm">yes</button>
	<button id="cancel">no</button>
	`;
	document.body.append(dialog);
	dialog.showModal();

	const confirmButton = dialog.querySelector("#confirm");
	const cancelButton = dialog.querySelector("#cancel");
	const result = new Promise((resolve) => {
		confirmButton.addEventListener("click", () => {
			dialog.close();
			resolve(true);
		});

		cancelButton.addEventListener("click", () => {
			dialog.close();
			resolve(false);
		});
	});
	return result;
}

/* ----------------------------- timeout system ----------------------------- */
class Timeout {
	constructor(callback, delay) {
		let timerId;
		let start;
		let remaining = delay;

		this.pause = function () {
			globalThis.clearTimeout(timerId);
			timerId = null;
			remaining -= Date.now() - start;
		};

		this.resume = function () {
			if (timerId) {
				return;
			}

			start = Date.now();
			timerId = globalThis.setTimeout(callback, remaining);
		};

		this.resume();
	}
}

/* -------------------------------------------------------------------------- */
/*                                Toasts System                               */
/* -------------------------------------------------------------------------- */
class Toast {
	static currentId = 0;

	constructor(type, title, content, duration) {
		this.id = Toast.currentId++;
		this.type = type;
		this.title = title;
		this.content = content;
		this.durationinms = duration;
		this.durationins = this.durationinms / 1000 + "s";
		this.toast = document.createElement("div");
		this.toast.classList.add("toast", type + "toast");
		if (type === "automove") this.toast.classList.add("infotoast"); // Serialize title and content in case of xss
		this.title = this.title.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		this.content = this.content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		// Implement code block system in the case where there is a string within ``
		this.content = this.content.replaceAll(
			/`(.+?)`/g,
			`<span class="cblock">$1</span>`
		);
		// Make newline if content includes \n and remove \n from string
		this.content = this.content
			.split("\n")
			.join("<br>")
			.replaceAll(String.raw`\n`, "");
		if (["warning", "error", "success", "info"].includes(type)) {
			this.toast.innerHTML = /* html */ `
            <div class="ttitle">
                <div class="ttitleseperator">
                <div class="wc">
                <i class="fa-regular fa-circle-${
									type === "success"
										? "check"
										: type === "warning"
											? "exclamation"
											: type === "error"
												? "xmark"
												: type === "info"
													? "info"
													: "check"
								} tinfoicon"></i></div>
                <span class="ttitletext">${this.title}</span>
            </div>
            <div class="wc cr tsp">
                <i class="fa-regular fa-xmark tdismiss"></i></div>
            </div>
            <div class="tcontent">
                <span class="tcontenttext">${this.content}</span>
            </div>
            <div class="tprogressbar"></div>`;
		} else if (type === "automove") {
			const countdownRegex = /Automove triggering in <br>(\d+) ms/;
			this.content = this.content.replace(countdownRegex, (match, p1) => {
				return `Automove triggering in <br><span class="tcas" id="toastcountdown-${this.id}">${p1}</span> ms`;
			});
			this.toast.innerHTML = /* html */ `
            <div class="ttitle">
                <div class="ttitleseperator">
                <div class="wc">
                <i class="fa-regular fa-circle-info tinfoicon"></i></div>
                <span class="ttitletext">${this.title}</span>
            </div>
            <div class="wc cr tsp">
                <i class="fa-regular fa-xmark tdismiss"></i></div>
            </div>
            <div class="tcontent">
                <span class="tcontenttext">${this.content}</span>
            </div>
            <div class="tprogressbar"></div>`;

			this.aduration = this.durationinms / 1000;
			const startTime = performance.now();
			const intervalId = setInterval(() => {
				this.countdownElement = document.querySelector(
					`#toastcountdown-${this.id}`
				);
				const elapsedTime = performance.now() - startTime;
				const remainingTime = this.durationinms - elapsedTime;
				const seconds = Math.floor(remainingTime / 1000);
				const milliseconds = Math.floor((remainingTime % 1000) / 100); // Divide by 10 to get 1-digit ms, floor to remove decimals
				const formattedMilliseconds = milliseconds.toString().padStart(1, "0"); // Pad with leading zeros
				if (this.countdownElement) {
					this.countdownElement.textContent = `${seconds}.${formattedMilliseconds}`; // Update the span with new time
				}

				if (remainingTime <= 0) {
					clearInterval(intervalId);
					setTimeout(
						() => {
							// Wait for the actual time to hit the 100 ms to make it accurate
							this.removeToast();
						},
						100 - (remainingTime % 100)
					);
				}
			}, 100); // Use a fixed interval of 100ms
			this.timeout = setTimeout(() => {
				this.removeToast();
				clearInterval(intervalId); // Clear the interval when the toast is removed
			}, this.durationinms);
		}

		const entrance = "slide-in";

		if (entrance === "fade-in") {
			this.toast.style.opacity = "0";
			this.toast.style.right = "0px";
		} else {
			this.toast.style.right = "-230px";
		}

		document.querySelector("#toastscontainer").append(this.toast);
		setTimeout(() => {
			if (entrance === "slide-in") {
				this.toast.style.opacity = "0.7";
				this.toast.style.animation = `t${entrance.split("-in")[0]}in 280ms cubic-bezier(0.4, 0, 0.2, 1)`;
			} else {
				this.toast.style.opacity = "0";
				this.toast.style.opacity = "0.7";
			}
		}, 10);
		setTimeout(() => {
			this.toast.style.right = 0;
		}, 280);
		const triggerOnHover = ["info", "warning", "success", "error"].includes(
			this.type
		);
		if (triggerOnHover) {
			this.toast.querySelectorAll(".tprogressbar")[0].style.animation =
				"tickdown " + this.durationins;
			this.timeout = new Timeout(() => {
				this.removeToast();
			}, this.durationinms);
			this.toast.addEventListener("mouseenter", () => {
				this.toast.querySelectorAll(
					".tprogressbar"
				)[0].style.animationPlayState = "paused";
				this.timeout.pause();
			});
			this.toast.addEventListener("mouseleave", () => {
				this.toast.querySelectorAll(
					".tprogressbar"
				)[0].style.animationPlayState = "running";
				this.timeout.resume();
			});
		} else {
			this.toast.querySelectorAll(".tprogressbar")[0].style.animation =
				"tickdown " + this.durationins;
		}

		this.toast
			.querySelectorAll(".tdismiss")[0]
			.addEventListener("click", () => {
				this.removeToast();
			});
	}

	removeToast() {
		this.toast.querySelectorAll(".tprogressbar")[0].style.display = "none";
		const exit = "slide-out";

		if (exit === "fade-out") {
			this.toast.style.opacity = "0.7";
		}

		setTimeout(() => {
			if (exit === "slide-out") {
				this.toast.style.opacity = "0.7";
				this.toast.style.animation = `t${exit.split("-out")[0]}out 280ms cubic-bezier(0.4, 0, 0.2, 1)`;
			} else {
				this.toast.style.opacity = "0.7";
				this.toast.style.opacity = "0";
			}
		}, 10);
		setTimeout(
			() => {
				this.toast.remove();
			},
			exit === "fade-out" ? 500 : 280
		);
	}
}
// Tooltip system
class Tooltip {
	constructor(element, positioning, content) {
		this.element = element;
		this.positioning = positioning;
		this.content = content;
		this.tooltipElement = null;
		this.createTooltip();
		this.attachEvents();
	}

	createTooltip() {
		this.tooltipElement = document.createElement("div");
		this.tooltipElement.classList.add("tooltip");
		this.tooltipElement.dataset.position = this.positioning;
		this.tooltipElement.setAttribute("og-position", this.positioning);
		this.tooltipElement.textContent = this.content;
		document.body.append(this.tooltipElement);
		this.updateTooltipPosition(null, "a");
	}

	updateTooltipPosition(mouseEvent, a) {
		const coords = this.element.getBoundingClientRect();
		const { scrollX } = globalThis;
		const { scrollY } = globalThis;
		if (a) {
			this.tooltipElement.style.minWidth = getComputedStyle(
				this.tooltipElement
			).width;
		}

		if (mouseEvent) {
			this._setTooltipPositionWithMouse(mouseEvent, coords, scrollX, scrollY);
			this._adaptTooltipToViewport(mouseEvent);
		} else {
			this._setTooltipPositionStatic(coords, scrollX, scrollY);
		}
	}

	_setTooltipPositionWithMouse(mouseEvent, coords, scrollX, scrollY) {
		const { clientX, clientY } = mouseEvent;
		switch (this.positioning) {
			case "follow-top": {
				this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth / 2}px`;
				this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight - 20}px`;
				break;
			}

			case "follow-bottom": {
				this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth / 2}px`;
				this.tooltipElement.style.top = `${clientY + 20}px`;
				break;
			}

			case "follow-left": {
				this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth - 20}px`;
				this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			case "follow-right": {
				this.tooltipElement.style.left = `${clientX + 20}px`;
				this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			case "top": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY - this.tooltipElement.offsetHeight}px`;
				break;
			}

			case "bottom": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
				break;
			}

			case "left": {
				this.tooltipElement.style.left = `${coords.left + scrollX - this.tooltipElement.offsetWidth - 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			case "right": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			default: {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
				break;
			}
		}
	}

	_setTooltipPositionStatic(coords, scrollX, scrollY) {
		switch (this.positioning) {
			case "top": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY - this.tooltipElement.offsetHeight}px`;
				break;
			}

			case "bottom": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
				break;
			}

			case "left": {
				this.tooltipElement.style.left = `${coords.left + scrollX - this.tooltipElement.offsetWidth - 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			case "right": {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
				break;
			}

			default: {
				this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
				this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
				break;
			}
		}
	}

	_adaptTooltipToViewport(mouseEvent) {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const style = globalThis.getComputedStyle(this.tooltipElement);
		const tooltipLeft = this.tooltipElement.getBoundingClientRect().left;
		const tooltipTop = Number.parseInt(style.top.slice(0, -2));
		const tooltipRight = Number.parseInt(style.right.slice(0, -2));
		const tooltipBottom = Number.parseInt(style.bottom.slice(0, -2));

		this._adjustHorizontalPosition(tooltipLeft, tooltipRight);
		this._adjustVerticalPosition(tooltipTop, tooltipBottom, mouseEvent);

		const originalPositioning = this.tooltipElement.getAttribute("og-position");
		const potentials = this._calculatePotentialPositions(
			originalPositioning,
			mouseEvent
		);
		const viewport = { width: viewportWidth, height: viewportHeight };

		const revertToOriginal = this._shouldRevertToOriginal(
			originalPositioning,
			potentials,
			viewport
		);

		if (revertToOriginal) {
			this.positioning = originalPositioning;
			this.tooltipElement.dataset.position = originalPositioning;
		} else {
			this.tooltipElement.dataset.position = this.positioning;
		}
	}

	_adjustHorizontalPosition(tooltipLeft, tooltipRight) {
		if (tooltipRight < 0) {
			if (this.positioning.includes("right")) {
				this.positioning = this.positioning.replace("right", "left");
			} else if (this.positioning.includes("follow-right")) {
				this.positioning = this.positioning.replace(
					"follow-right",
					"follow-left"
				);
			}
		}

		if (tooltipLeft < 0 && this.positioning.includes("left")) {
			this.positioning = this.positioning.replace("left", "right");
		}
	}

	_adjustVerticalPosition(tooltipTop, tooltipBottom, mouseEvent) {
		if (tooltipTop < 30 && this.positioning.includes("top")) {
			this.positioning = this.positioning.replace("top", "bottom");
			this.updateTooltipPosition(mouseEvent);
		}

		if (
			tooltipBottom < window.innerHeight &&
			this.positioning.includes("bottom")
		) {
			this.positioning = this.positioning.replace("bottom", "top");
		}
	}

	_calculatePotentialPositions(originalPositioning, mouseEvent) {
		let potentialLeft;
		let potentialRight;
		let potentialBottom;
		let potentialTop;
		if (originalPositioning.startsWith("follow-")) {
			const cursorOffsetX = mouseEvent ? mouseEvent.clientX : 0;
			const cursorOffsetY = mouseEvent ? mouseEvent.clientY : 0;
			potentialLeft = cursorOffsetX - 20 - this.tooltipElement.offsetWidth;
			potentialRight = cursorOffsetX + this.tooltipElement.offsetWidth + 20;
			potentialTop = cursorOffsetY - 20 - this.tooltipElement.offsetHeight;
			potentialBottom = cursorOffsetY + this.tooltipElement.offsetHeight + 20;
		} else {
			const boundElementRect = this.element.getBoundingClientRect();
			if (originalPositioning === "left" || originalPositioning === "right") {
				potentialLeft = boundElementRect.left - this.tooltipElement.offsetWidth;
				potentialRight =
					boundElementRect.right + this.tooltipElement.offsetWidth;
			} else {
				if (originalPositioning === "top") {
					potentialTop =
						boundElementRect.top - this.tooltipElement.offsetHeight;
					potentialBottom =
						boundElementRect.bottom + this.tooltipElement.offsetHeight;
				}

				if (originalPositioning === "bottom") {
					potentialTop = boundElementRect.bottom;
					potentialBottom =
						boundElementRect.bottom + this.tooltipElement.offsetHeight;
				}
			}
		}

		return { potentialLeft, potentialRight, potentialTop, potentialBottom };
	}

	_shouldRevertToOriginal(originalPositioning, potentials, viewport) {
		const { potentialLeft, potentialRight, potentialTop, potentialBottom } =
			potentials;
		const { width: viewportWidth, height: viewportHeight } = viewport;

		if (
			originalPositioning.includes("right") &&
			potentialRight < viewportWidth
		) {
			return true;
		}

		if (originalPositioning.includes("left") && potentialLeft > 0) {
			return true;
		}

		if (originalPositioning.includes("top") && potentialTop > 30) {
			return true;
		}

		if (
			originalPositioning.includes("bottom") &&
			potentialBottom < viewportHeight
		) {
			return true;
		}

		return false;
	}

	attachEvents() {
		this.element.addEventListener("mouseenter", (event) => {
			this.showTooltip();
			if (this.positioning.startsWith("follow-")) {
				this.updateTooltipPosition(event);
			}
		});

		this.element.addEventListener("mousemove", (event) => {
			if (this.positioning.startsWith("follow-")) {
				this.updateTooltipPosition(event);
			}
		});

		this.element.addEventListener("mouseleave", () => {
			this.hideTooltip();
		});
		this.element.addEventListener("mouseenter", () => {
			this.showTooltip();
		});
		this.element.addEventListener("mouseleave", () => {
			this.hideTooltip();
		});
		window.addEventListener("resize", () => {
			this.updateTooltipPosition();
		});
		window.addEventListener("scroll", () => {
			this.updateTooltipPosition();
		});
	}

	showTooltip() {
		this.updateTooltipPosition();
		this.tooltipElement.style.opacity = "0.8";
	}

	hideTooltip() {
		this.tooltipElement.style.opacity = "0";
	}
}
