function loadComponent(url, elementId) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById(elementId).innerHTML = this.responseText;
			if (elementId === "sidebar") {
				addToggleInterests();
			}
		}
	};
	xhr.send();
}

function addToggleInterests() {
	const toggleInterests = document.querySelector(".toggle-interests");
	const interestsContent = document.querySelector(".interests-content");

	if (toggleInterests && interestsContent) {
		toggleInterests.addEventListener("click", function (e) {
			e.preventDefault();
			this.classList.toggle("open");
			interestsContent.style.display =
				interestsContent.style.display === "block" ? "none" : "block";
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	loadComponent("header.html", "header");
	loadComponent("sidebar.html", "sidebar");
});