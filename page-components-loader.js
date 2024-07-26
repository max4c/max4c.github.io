function loadComponent(url, elementId) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById(elementId).innerHTML = this.responseText;
			if (elementId === "sidebar") {
				addHoverInterests();
			}
		}
	};
	xhr.send();
}

function addHoverInterests() {
	const toggleInterests = document.querySelector(".toggle-interests");
	const interestsContent = document.querySelector(".interests-content");

	if (toggleInterests && interestsContent) {
		toggleInterests.addEventListener("mouseenter", function () {
			this.classList.add("open");
			interestsContent.style.display = "block";
			setTimeout(() => interestsContent.classList.add("visible"), 50);
		});

		const interestsSection = document.querySelector(".interests-section");
		interestsSection.addEventListener("mouseleave", () => {
			toggleInterests.classList.remove("open");
			interestsContent.classList.remove("visible");
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	loadComponent("header.html", "header");
	loadComponent("sidebar.html", "sidebar");
});