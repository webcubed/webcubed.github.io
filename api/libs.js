/* ----------------------------- timeout system ----------------------------- */
Timeout = function (callback, delay) {
    var timerId,
        start,
        remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };

    this.resume = function () {
        if (timerId) {
            return;
        }

        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
};
/* -------------------------------------------------------------------------- */
/*                                Toasts System                               */
/* -------------------------------------------------------------------------- */
Toast = class {
    static currentId = 0;
    constructor(type, title, content, duration) {
        this.id = Toast.currentId++;
        this.type = type;
        this.title = title;
        this.content = content;
        this.durationinms = duration;
        this.durationins = this.durationinms / 1000 + "s";
        this.toast = document.createElement("div");
        this.toast.classList.add("toast");
        this.toast.classList.add(type + "toast");
        type == "automove" ? this.toast.classList.add("infotoast") : null;
        // serialize title and content in case of xss
        this.title = this.title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.content = this.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // implement code block system in the case where there is a string within ``
        this.content = this.content.replace(/`(.+?)`/g, `<span class="cblock">$1</span>`);
        // make newline if content includes \n and remove \n from string
        this.content = this.content.split("\n").join("<br>").replace(/\\n/g, "");
        if (["warning", "error", "success", "info"].includes(type)) {
            this.toast.innerHTML = `
            <div class="ttitle">
                <div class="ttitleseperator">
                <div class="wc">
                <i class="fa-regular fa-circle-${
                    type == "success" ? "check" : type == "warning" ? "exclamation" : type == "error" ? "xmark" : type == "info" ? "info" : "check"
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
        } else if (type == "automove") {
            const countdownRegex = /Automove triggering in <br>(\d+) ms/;
            this.content = this.content.replace(countdownRegex, (match, p1) => {
                return `Automove triggering in <br><span class="tcas" id="toastcountdown-${this.id}">${p1}</span> ms`;
            });
            this.toast.innerHTML = `
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
            let startTime = performance.now();
            let intervalId = setInterval(() => {
                this.countdownElement = document.getElementById(`toastcountdown-${this.id}`);
                let elapsedTime = performance.now() - startTime;
                let remainingTime = this.durationinms - elapsedTime;
                let seconds = Math.floor(remainingTime / 1000);
                let milliseconds = Math.floor((remainingTime % 1000) / 100); // Divide by 10 to get 1-digit ms, floor to remove decimals
                let formattedMilliseconds = milliseconds.toString().padStart(1, "0"); // Pad with leading zeros
                if (this.countdownElement) {
                    this.countdownElement.innerText = `${seconds}.${formattedMilliseconds}`; // Update the span with new time
                }
                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        // Wait for the actual time to hit the 100 ms to make it accurate
                        this.removeToast();
                    }, 100 - (remainingTime % 100));
                }
            }, 100); // Use a fixed interval of 100ms
            this.timeout = setTimeout(() => {
                this.removeToast();
                clearInterval(intervalId); // Clear the interval when the toast is removed
            }, this.durationinms);
        }
        const entrance = "slide-in";

        if (entrance == "fade-in") {
            this.toast.style.opacity = "0";
            this.toast.style.right = "0px";
        } else {
            this.toast.style.right = "-230px";
        }

        document.getElementById("toastscontainer").appendChild(this.toast);
        setTimeout(() => {
            if (entrance == "slide-in") {
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
        const triggerOnHover = ["info", "warning", "success", "error"].includes(this.type);
        if (triggerOnHover) {
            this.toast.getElementsByClassName("tprogressbar")[0].style.animation = "tickdown " + this.durationins;
            this.timeout = new Timeout(() => {
                this.removeToast();
            }, this.durationinms);
            this.toast.addEventListener("mouseenter", () => {
                this.toast.getElementsByClassName("tprogressbar")[0].style.animationPlayState = "paused";
                this.timeout.pause();
            });
            this.toast.addEventListener("mouseleave", () => {
                this.toast.getElementsByClassName("tprogressbar")[0].style.animationPlayState = "running";
                this.timeout.resume();
            });
        } else {
            this.toast.getElementsByClassName("tprogressbar")[0].style.animation = "tickdown " + this.durationins;
        }
        this.toast.getElementsByClassName("tdismiss")[0].addEventListener("click", () => {
            this.removeToast();
        });
    }
    removeToast() {
        this.toast.getElementsByClassName("tprogressbar")[0].style.display = "none";
        const exit = "slide-out";

        if (exit == "fade-out") {
            this.toast.style.opacity = "0.7";
        }

        setTimeout(() => {
            if (exit == "slide-out") {
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
            exit == "fade-out" ? 500 : 280
        );
    }
};
// tooltip system
Tooltip = class {
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
        this.tooltipElement.setAttribute("data-position", this.positioning);
        this.tooltipElement.setAttribute("og-position", this.positioning);
        this.tooltipElement.textContent = this.content;
        document.body.appendChild(this.tooltipElement);
        this.updateTooltipPosition(null, "a");
    }

    updateTooltipPosition(mouseEvent, a) {
        const coords = this.element.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        if (a) {
            this.tooltipElement.style.minWidth = getComputedStyle(this.tooltipElement).width;
        }
        if (mouseEvent) {
            const { clientX, clientY } = mouseEvent;
            switch (this.positioning) {
                case "follow-top":
                    this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth / 2}px`;
                    this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight - 20}px`; // 10px offset
                    break;
                case "follow-bottom":
                    this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth / 2}px`;
                    this.tooltipElement.style.top = `${clientY + 20}px`; // 5px offset
                    break;
                case "follow-left":
                    this.tooltipElement.style.left = `${clientX - this.tooltipElement.offsetWidth - 20}px`; // 5px offset
                    this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight / 2}px`;
                    break;
                case "follow-right":
                    this.tooltipElement.style.left = `${clientX + 20}px`; // 5px offset
                    this.tooltipElement.style.top = `${clientY - this.tooltipElement.offsetHeight / 2}px`;
                    break;
                case "top":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY - this.tooltipElement.offsetHeight}px`;
                    break;
                case "bottom":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
                    break;
                case "left":
                    this.tooltipElement.style.left = `${coords.left + scrollX - this.tooltipElement.offsetWidth - 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
                    break;
                case "right":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
                    break;
                // ... existing positioning cases ...
            }
            /* ------------------ start adapting tooltip functionality ------------------ */
            // Get the viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate the position of the tooltip
            const style = window.getComputedStyle(this.tooltipElement);
            const tooltipLeft = this.tooltipElement.getBoundingClientRect().left;
            const tooltipTop = parseInt(style.top.slice(0, -2));
            const tooltipRight = parseInt(style.right.slice(0, -2));
            const tooltipBottom = parseInt(style.bottom.slice(0, -2));

            // Check if the tooltip hits the right wall
            if (tooltipRight < 0) {
                if (this.positioning.includes("right")) {
                    this.positioning = this.positioning.replace("right", "left");
                } else if (this.positioning.includes("follow-right")) {
                    this.positioning = this.positioning.replace("follow-right", "follow-left");
                }
            }
            // Check if the tooltip hits the left wall
            if (tooltipLeft < 0) {
                if (this.positioning.includes("left")) {
                    this.positioning = this.positioning.replace("left", "right");
                }
            }
            // Check if the tooltip hits the top wall
            if (tooltipTop < 30) {
                if (this.positioning.includes("top")) {
                    this.positioning = this.positioning.replace("top", "bottom");
                    this.updateTooltipPosition(mouseEvent);
                }
            }
            // Check if the tooltip hits the bottom wall
            if (tooltipBottom < viewportHeight) {
                if (this.positioning.includes("bottom")) {
                    this.positioning = this.positioning.replace("bottom", "top");
                }
            }
            const originalPositioning = this.tooltipElement.getAttribute("og-position");
            let revertToOriginal = false;

            // Calculate the position based on the cursor or the binding element
            let potentialLeft, potentialRight, potentialBottom, potentialTop;
            if (originalPositioning.startsWith("follow-")) {
                // Follow cursor logic
                const cursorOffsetX = mouseEvent.clientX;
                potentialLeft = cursorOffsetX - 20 - this.tooltipElement.offsetWidth;
                potentialRight = cursorOffsetX + this.tooltipElement.offsetWidth + 20;
                potentialTop = mouseEvent.clientY - 20 - this.tooltipElement.offsetHeight;
                potentialBottom = mouseEvent.clientY + this.tooltipElement.offsetHeight + 20;
            } else {
                // Static positioning relative to the binding element logic
                const boundElementRect = this.element.getBoundingClientRect();
                if (originalPositioning === "left" || originalPositioning === "right") {
                    potentialLeft = boundElementRect.left - this.tooltipElement.offsetWidth;
                    potentialRight = boundElementRect.right + this.tooltipElement.offsetWidth;
                } else {
                    // For top and bottom positioning, you would handle Y coordinates similarly
                    if (originalPositioning === "top") {
                        potentialTop = boundElementRect.top - this.tooltipElement.offsetHeight;
                        potentialBottom = boundElementRect.bottom + this.tooltipElement.offsetHeight;
                    } else if (originalPositioning === "bottom") {
                        potentialTop = boundElementRect.bottom;
                        potentialBottom = boundElementRect.bottom + this.tooltipElement.offsetHeight;
                    }
                    // ...
                }
            }

            // Check if the calculated position is within the viewport
            if (originalPositioning.includes("right") && potentialRight < viewportWidth) {
                revertToOriginal = true;
            } else if (originalPositioning.includes("left") && potentialLeft > 0) {
                revertToOriginal = true;
            }
            // Add similar checks for top and bottom positioning if needed
            else if (originalPositioning.includes("top") && potentialTop > 30) {
                revertToOriginal = true;
            } else if (originalPositioning.includes("bottom") && potentialBottom < viewportHeight) {
                revertToOriginal = true;
            }

            // Revert to the original positioning if possible and update the data-position attribute
            if (revertToOriginal) {
                this.positioning = originalPositioning;
                this.tooltipElement.setAttribute("data-position", originalPositioning);
            } else {
                // Update the data-position attribute as the positioning changes
                this.tooltipElement.setAttribute("data-position", this.positioning);
            }
        } else {
            switch (this.positioning) {
                case "top":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY - this.tooltipElement.offsetHeight}px`;
                    break;
                case "bottom":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width / 2 - this.tooltipElement.offsetWidth / 2 + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height}px`;
                    break;
                case "left":
                    this.tooltipElement.style.left = `${coords.left + scrollX - this.tooltipElement.offsetWidth - 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
                    break;
                case "right":
                    this.tooltipElement.style.left = `${coords.left + scrollX + coords.width + 10}px`;
                    this.tooltipElement.style.top = `${coords.top + scrollY + coords.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
                    break;
            }
        }
    }

    attachEvents() {
        this.element.addEventListener("mouseenter", (e) => {
            this.showTooltip();
            if (this.positioning.startsWith("follow-")) {
                this.updateTooltipPosition(e);
            }
        });

        this.element.addEventListener("mousemove", (e) => {
            if (this.positioning.startsWith("follow-")) {
                this.updateTooltipPosition(e);
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
        this.tooltipElement.style.opacity = "1";
    }

    hideTooltip() {
        this.tooltipElement.style.opacity = "0";
    }
};
