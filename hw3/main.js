'use strict'

const WIDTH = 500;
const HEIGHT = window.innerHeight;
const VSCROLL = 1;
const SPEED = 2;
const PFHEIGHT = 10;
const MAXLEN = 100;
const MINLEN = 50;
const MINTOP = 100;
const MAXTOP = 150;

let player;

let pflen;
let btom;
let tp;

let goodPf;
let badPf;

let status;
let stat;

let playerImg;
let playerImgR;
let goodPfImg;
let badPfImg;

window.onload = function() {
	initImages();
	initStats();
	initCanvas();
	initBtns();
}

let initImages = function() {
	playerImg = new Image();
	playerImgR = new Image();
	goodPfImg = new Image();
	badPfImg = new Image();
	playerImg.src = "img/owl.jpg";
	playerImgR.src = "img/owl_r.jpeg";
	goodPfImg.src = "img/safe.png";
	badPfImg.src = "img/dangerous.png";
}

// Initialize statistics shown on the page by retrieving from local cache
// or setting to default value if cache is disabled
let initStats = function() {
	const items = ["highScore", "highEnemy", "num"];
	if (window.localStorage) {
		items.forEach(item => {
			let cached = localStorage.getItem(item);
			document.getElementById(item).innerHTML = cached ? cached : 0;
		});
		// Handled separately since CTR needs to be updated upon loading
		let ctr = localStorage.getItem("ctr");
		if (ctr) {
			localStorage.setItem("ctr", parseInt(ctr) + 1);
		} else {
			localStorage.setItem("ctr", "1");
		}
		document.getElementById("ctr").innerHTML = localStorage.getItem("ctr");
	} else {
		items.forEach(item => {
			document.getElementById(item).innerHTML = 0;
		});
		document.getElementById("ctr").innerHTML = 1;
	}
}

let initCanvas = function() {
	let canvas = document.getElementById("view");
	canvas.setAttribute("width",WIDTH);
	canvas.setAttribute("height",HEIGHT);
}

// Called by onload(). Set styles and handlers for all the buttons
let initBtns = function() {
	let initControl = function(left) {
		let btn = document.getElementById(left ? "left" : "right");
		btn.style.position = "absolute";
		btn.style.width = (WIDTH / 5) + "px";
		btn.style.height = (HEIGHT / 10) + "px";
		btn.style.left = (WIDTH / 2 - (left ? WIDTH / 5 : 0)) + "px";
		btn.style.top = (HEIGHT - HEIGHT / 10) + "px";
		btn.style.backgroundPosition = "center";
		btn.addEventListener("mousedown", function() {
			player.vx = left ? -2 : 2;
			player.toLeft = left;
		});
		btn.addEventListener("mouseup", function () {
			player.vx = 0;
		});
		btn.addEventListener("mouseleave", function() {
			player.vx = 0;
		});
	}
	initControl(true);
	initControl(false);
	let startBtn = document.getElementById("start");
	startBtn.addEventListener("click", function() {
		startGame();
		startBtn.disabled = true;
	});
}

// Update the DOM corresponding to different state
let updateDom = function(state) {
	if (state === "start") {
		let newNum = parseInt(document.getElementById("num").innerHTML) + 1;
		document.getElementById("num").innerHTML = newNum;
		if (window.localStorage) {
			localStorage.setItem("num", newNum);
		}
		document.getElementById("left").disabled = false;
		document.getElementById("right").disabled = false;
		document.getElementById("lost").style.color = "white";
	} else if (state === "lost") {
		document.getElementById("start").disabled = false;
		document.getElementById("left").disabled = true;
		document.getElementById("right").disabled = true;
		document.getElementById("lost").style.color = "red";
	} else if (state === "in game") {
		stat.score = Math.floor(stat.score + player.vy);
		document.getElementById("score").innerHTML = stat.score;
		document.getElementById("enemy").innerHTML = stat.enemy;
		if (window.localStorage) {
			if (!localStorage.getItem("highScore") ||
				stat.score > parseInt(localStorage.getItem("highScore"))) {
				document.getElementById("highScore").innerHTML = stat.score;
				localStorage.setItem("highScore", stat.score);
			}
			if (!localStorage.getItem("highEnemy") ||
				stat.enemy > parseInt(localStorage.getItem("highEnemy"))) {
				document.getElementById("highEnemy").innerHTML = stat.enemy;
				localStorage.setItem("highEnemy", stat.enemy);
			}
		} else {
			if (stat.score >
				parseInt(document.getElementById("highScore").innerHTML)) {
				document.getElementById("highScore").innerHTML = stat.score;
			}
			if (stat.enemy >
				parseInt(document.getElementById("highEnemy").innerHTML)) {
				document.getElementById("highEnemy").innerHTML = stat.enemy;
			}
		}
	}
}

// Initialize a new game and start updating/animation
let startGame = function() {
	updateDom("start");

	// Initialize global variables
	player = {
		x: 250,
		y: 250,
		radius: 20,
		vx: 0,
		vy: 0,
		toLeft: true
	};
	goodPf = [];
    badPf = [];
	stat = {
		score: 0,
		enemy: 0
	};
	status = "IN GAME";
	pflen = 100;
	btom = 200;
	tp = 100;

	goodPf[0] = {
		len: pflen,
		x: player.x - pflen / 2,
		y: player.y + player.radius
	};

	spawnPfs();

	draw();
	window.requestAnimationFrame(update);
}

// Spawn new platforms as long as there is room in the bottom
// Dangerous plarform will be spawned 1 out 4 times on average
let spawnPfs = function() {
	// Get the next height to spawn platform
	let toSpawn = function() {
		let current = goodPf[goodPf.length - 1].y;
		if (badPf.length !== 0) {
			current = Math.max(current, badPf[badPf.length - 1].y);
		}
		return Math.floor(Math.random() * (btom - tp)) + tp + current;
	}
	let nextpfy = toSpawn();
	// Given height, spawn a platform at a random horizontal position
	let spawn = function(pf) {
		pf[pf.length] = {
			len: pflen,
			x: Math.floor(Math.random() * (WIDTH - pflen)),
			y: nextpfy
		};
	}
	while (nextpfy < HEIGHT) {
		if (Math.floor(Math.random() * 4) === 0) {
			spawn(badPf);
		} else {
			spawn(goodPf);
		}
		nextpfy = toSpawn();
	}
}

// Draw the canvas to reflect the updates to the user
let draw = function() {
	var ctx = document.getElementById("view").getContext("2d");
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.drawImage(player.toLeft ? playerImg : playerImgR,
		player.x - player.radius, player.y - player.radius,
		2 * player.radius, 2 * player.radius);

	goodPf.forEach(function(pf) {
		ctx.drawImage(goodPfImg, pf.x, pf.y, pf.len, PFHEIGHT);
	});

	badPf.forEach(function(pf) {
		ctx.drawImage(badPfImg, pf.x, pf.y, pf.len, PFHEIGHT);
	});

	if (status !== "IN GAME") {
		updateDom("lost");
		return;
	}

	window.requestAnimationFrame(update);
}

// Called by update(). Responsible for updating platform-related information
// Check if the player is landed on a safe platform and return this information
let updatePfs = function() {
	// Helper function to check if a pf has player landed on
	let landed = pf => player.x >= pf.x - player.radius / 2 &&
			player.x <= pf.x + player.radius / 2 + pf.len &&
			pf.y === player.y + player.radius;
	let onGood = false;
	goodPf.forEach(function(pf) {
		if (landed(pf)) {
			onGood = true;
		}
		pf.y = pf.y - VSCROLL;
	});

	badPf.forEach(function(pf) {
		if (landed(pf)) {
			status = "LOST";
		}
		pf.y = pf.y - VSCROLL;
	});

	// Delete platforms that move pass the top boundary
	while (goodPf.length > 0 && goodPf[0].y <= 0) {
		goodPf.shift();
	}
	while (badPf.length > 0 && badPf[0].y <= 0) {
		badPf.shift();
		stat.enemy = stat.enemy + 1;
	}

	spawnPfs();

	return onGood;
}

// Called by update(). Responsible for updating player-related information
let updatePlayer = function(onGood) {
	player.vy = onGood ? 0 : player.vy + 0.1;
	player.x = player.x + player.vx;
	if (player.x < player.radius) {
		player.x = player.radius;
	}
	if (player.x > WIDTH - player.radius) {
		player.x = WIDTH - player.radius;
	}
	var oldY = player.y - VSCROLL;
	player.y = player.y + player.vy - VSCROLL;

	// Helper function to check if player will move across a platform on the
	// next update. If so, consider the player as landed.
	let closeTo = (pf, oldY) => oldY <= pf.y - player.radius && player.y >=
			pf.y - player.radius && player.x >= pf.x - player.radius / 2 &&
			player.x <= pf.x + + player.radius / 2 + pf.len;

	goodPf.forEach(function(pf) {
		if (closeTo(pf, oldY)) {
			player.y = pf.y - player.radius;
		}
	});
	badPf.forEach(function(pf) {
		if (closeTo(pf, oldY)) {
			player.y = pf.y - player.radius;
		}
	});

	if (player.y <= player.radius || player.y >= HEIGHT - player.radius) {
		status = "LOST";
	}
}

// The main update function
let update = function() {
	let onGood = updatePfs();
	updatePlayer(onGood);
	updateDom("in game");

	// Increase difficulty as the player descends further
	if (pflen > MINLEN) {
		pflen = MAXLEN - stat.score / 100;
	}
	if (tp < MAXTOP) {
		tp = MINTOP + stat.score / 100;
	}

	draw();
}