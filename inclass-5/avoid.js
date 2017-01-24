var width = window.innerWidth;
var height = window.innerHeight;

function moveBtn() {
	var btn = document.getElementById("click");
	btn.style.left = ((parseInt(btn.style.left.substring(0,btn.style.left.length - 2)) + btn.offsetWidth) % width) + "px";
	btn.style.top = ((parseInt(btn.style.top.substring(0,btn.style.top.length - 2)) + btn.offsetHeight) % height) + "px";
}

window.onload = function() {
	var btn = document.getElementById("click");
	btn.style.position = "absolute";
	btn.style.left = "100px";
	btn.style.top = "100px";
	btn.addEventListener("mouseover", moveBtn);
	var gameOver = false;
	var congrat = document.getElementById("congrat");
	btn.addEventListener("click", function() {
		if (!gameOver) {
			btn.innerHTML = "Play Again";
			btn.removeEventListener("mouseover", moveBtn);
			congrat.style.display = "inline";
		} else {
			btn.innerHTML = "Click Me";
			btn.addEventListener("mouseover", moveBtn);
			congrat.style.display = "none";
		}
		gameOver = !gameOver;
	});
	document.addEventListener("keydown", function(e) {
		var keyCode = e.keyCode;
		if (keyCode === 16) {
			btn.removeEventListener("mouseover", moveBtn);
		}
	});
	document.addEventListener("keyup", function(e) {
		var keyCode = e.keyCode;
		if (keyCode === 16 && !gameOver) {
			btn.addEventListener("mouseover", moveBtn);
		}
	});
}