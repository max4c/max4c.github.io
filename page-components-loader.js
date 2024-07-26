function loadComponent(url, elementId) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById(elementId).innerHTML = this.responseText;
			if (elementId === "sidebar") {
				addInterestsInteraction();
			}
		}
	};
	xhr.send();
}

function addInterestsInteraction() {
	const toggleInterests = document.querySelector(".toggle-interests");
	const interestsContent = document.querySelector(".interests-content");
	const interestsSection = document.querySelector(".interests-section");

	if (toggleInterests && interestsContent) {
		if (isTouchDevice()) {
			// For touch devices (mobile)
			toggleInterests.addEventListener("click", function (e) {
				e.preventDefault();
				this.classList.toggle("open");
				if (interestsContent.classList.contains("visible")) {
					closeInterests(interestsContent);
				} else {
					openInterests(interestsContent);
				}
			});
		} else {
			// For non-touch devices (desktop)
			toggleInterests.addEventListener("mouseenter", function () {
				this.classList.add("open");
				openInterests(interestsContent);
			});

			interestsSection.addEventListener("mouseleave", () => {
				toggleInterests.classList.remove("open");
				closeInterests(interestsContent);
			});
		}
	}
}

function openInterests(interestsContent) {
	interestsContent.style.display = "block";
	setTimeout(() => interestsContent.classList.add("visible"), 50);
}

function closeInterests(interestsContent) {
	interestsContent.classList.remove("visible");
}

function isTouchDevice() {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

document.addEventListener("DOMContentLoaded", () => {
	loadComponent("header.html", "header");
	loadComponent("sidebar.html", "sidebar");
});