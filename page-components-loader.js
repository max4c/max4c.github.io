function loadComponent(url, elementId, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById(elementId).innerHTML = this.responseText;
			if (callback) callback();
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

function loadSidebar() {
	const path = window.location.pathname;
	const sidebarPath = path.includes("/writing/")
		? "../sidebar.html"
		: "sidebar.html";
	const postId = document.body.getAttribute("data-post-id");

	loadComponent(sidebarPath, "sidebar", () => {
		if (postId) {
			const logo = document.querySelector(".logo img");
			if (logo) {
				logo.src = `../images/${postId}-logo.png`;
			}
		}

		// Adjust the logo link
		const logoLink = document.querySelector(".logo a");
		if (logoLink) {
			logoLink.href = path.includes("/writing/")
				? "../index.html"
				: "index.html";
		}

		addInterestsInteraction();
	});
}

function applyDarkMode() {
	const currentHour = new Date().getHours();
	const isDarkMode = currentHour < 6 || currentHour >= 18; 

	if (isDarkMode) {
		document.body.classList.add("dark-mode");
	} else {
		document.body.classList.remove("dark-mode");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	loadSidebar();
	applyDarkMode();
});
