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

var player;

var pflen;
var btom;
var tp;

var goodPf;
var badPf;

var status;
var stat;

var playerImg = new Image();
var playerImgR = new Image();
var goodPfImg = new Image();
var badPfImg = new Image();

window.onload = function() {
	playerImg.src = "img/owl.jpg";
	playerImgR.src = "img/owl_r.jpeg";
	goodPfImg.src = "img/safe.png";
	badPfImg.src = "img/dangerous.png";

	readStat();
	var canvas = document.getElementById("view");
	canvas.setAttribute("width",WIDTH);
	canvas.setAttribute("height",HEIGHT);
	var leftBtn = document.getElementById("left");
	var rightBtn = document.getElementById("right");
	leftBtn.style.position = 'absolute';
	rightBtn.style.position = 'absolute';
	leftBtn.style.width = (WIDTH / 5) + 'px';
	rightBtn.style.width = (WIDTH / 5) + 'px';
	leftBtn.style.height = (HEIGHT / 10) + 'px';
	rightBtn.style.height = (HEIGHT / 10) + 'px';
	leftBtn.style.left = (WIDTH / 2 - WIDTH / 5) + 'px';
	leftBtn.style.top = (HEIGHT - HEIGHT / 10) + 'px';
	rightBtn.style.left = (WIDTH / 2) + 'px';
	rightBtn.style.top = (HEIGHT - HEIGHT / 10) + 'px';
	leftBtn.style.backgroundPosition = 'center';
	rightBtn.style.backgroundPosition = 'center';
	leftBtn.addEventListener("mousedown", function() {
		player.vx = -2;
		player.toLeft = true;
	});
	leftBtn.addEventListener("mouseup", function() {
		player.vx = 0;
	});
	leftBtn.addEventListener("mouseleave", function() {
		player.vx = 0;
	});
	rightBtn.addEventListener("mousedown", function() {
		player.vx = 2;
		player.toLeft = false;
	});
	rightBtn.addEventListener("mouseup", function() {
		player.vx = 0;
	});
	rightBtn.addEventListener("mouseleave", function() {
		player.vx = 0;
	});
	var startBtn = document.getElementById("start");
	startBtn.addEventListener("click", function() {
		startGame();
		startBtn.disabled = true;
	});
}

var readStat = function() {
	if (window.localStorage) {
		var highScore = localStorage.getItem("highScore");
		if (highScore) {
			document.getElementById("high score").innerHTML = highScore;
		} else {
			document.getElementById("high score").innerHTML = 0;
		}
		var highEnemy = localStorage.getItem("highEnemy");
		if (highEnemy) {
			document.getElementById("high enemy").innerHTML = highEnemy;
		} else {
			document.getElementById("high enemy").innerHTML = 0;
		}
		var ctr = localStorage.getItem("ctr");
		if (ctr) {
			localStorage.setItem("ctr", parseInt(ctr) + 1);
		} else {
			localStorage.setItem("ctr", "1");
		}
		document.getElementById("ctr").innerHTML = localStorage.getItem("ctr");
		var num = localStorage.getItem("num");
		if (num) {
			document.getElementById("num").innerHTML = num;
		} else {
			document.getElementById("num").innerHTML = 0;
		}
	} else {
		document.getElementById("high score").innerHTML = 0;
		document.getElementById("high enemy").innerHTML = 0;
		document.getElementById("ctr").innerHTML = 1;
		document.getElementById("num").innerHTML = 0;
	}
}

var startGame = function() {
	document.getElementById("num").innerHTML = parseInt(document.getElementById("num").innerHTML) + 1;
	if (window.localStorage) {
		localStorage.setItem("num", document.getElementById("num").innerHTML);
	}
	document.getElementById("left").disabled = false;
	document.getElementById("right").disabled = false;
	document.getElementById("lost").style.color = "white";
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

	spawn();

	draw();
	window.requestAnimationFrame(update);
}

var toSpawn = function() {
	var current;
	if (badPf.length === 0) {
		current = goodPf[goodPf.length - 1].y;
	} else {
		current = Math.max(goodPf[goodPf.length - 1].y, badPf[badPf.length - 1].y);
	}
	return Math.floor(Math.random() * (btom - tp)) + tp + current;
}

var spawn = function() {
	var nextpfy = toSpawn();
	while (nextpfy < HEIGHT) {
		if (Math.floor(Math.random() * 4) === 0) {
			badPf[badPf.length] = {
				len: pflen,
				x: Math.floor(Math.random() * (WIDTH - pflen)),
				y: nextpfy
			};
		} else {
			goodPf[goodPf.length] = {
				len: pflen,
				x: Math.floor(Math.random() * (WIDTH - pflen)),
				y: nextpfy
			};
		}
		nextpfy = toSpawn();
	}
}

var draw = function() {
	var ctx = document.getElementById("view").getContext("2d");
	ctx.clearRect(0,0,WIDTH,HEIGHT);

	if (player.toLeft) {
		ctx.drawImage(playerImg, player.x - player.radius, player.y - player.radius, 2 * player.radius, 2 * player.radius);
	} else {
		ctx.drawImage(playerImgR, player.x - player.radius, player.y - player.radius, 2 * player.radius, 2 * player.radius);
	}

	goodPf.forEach(function(pf) {
		ctx.drawImage(goodPfImg, pf.x, pf.y, pf.len, PFHEIGHT);
	});

	badPf.forEach(function(pf) {
		ctx.drawImage(badPfImg, pf.x, pf.y, pf.len, PFHEIGHT);
	});

	if (status !== "IN GAME") {
		document.getElementById("start").disabled = false;
		document.getElementById("left").disabled = true;
		document.getElementById("right").disabled = true;
		document.getElementById("lost").style.color = "red";
		return;
	}

	window.requestAnimationFrame(update);
}

var landed = function(pf) {
	return player.x >= pf.x - player.radius / 2 &&
		player.x <= pf.x + player.radius / 2 + pf.len &&
		pf.y === player.y + player.radius;
}

var closeTo = function(pf, oldY) {
	return oldY <= pf.y - player.radius && player.y >= pf.y - player.radius &&
		player.x >= pf.x - player.radius / 2 &&
		player.x <= pf.x + + player.radius / 2 + pf.len;
}

var update = function() {
	var onGood = false;
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

	while (goodPf.length > 0 && goodPf[0].y <= 0) {
		goodPf.shift();
	}
	while (badPf.length > 0 && badPf[0].y <= 0) {
		badPf.shift();
		stat.enemy = stat.enemy + 1;
	}

	spawn();

	if (!onGood) {
		player.vy = player.vy + 0.1;
	} else {
		player.vy = 0;
	}

	player.x = player.x + player.vx;
	if (player.x < player.radius) {
		player.x = player.radius;
	}
	if (player.x > WIDTH - player.radius) {
		player.x = WIDTH - player.radius;
	}
	var oldY = player.y - VSCROLL;
	player.y = player.y + player.vy - VSCROLL;

	stat.score = Math.floor(stat.score + player.vy);
	document.getElementById("score").innerHTML = stat.score;
	document.getElementById("enemy").innerHTML = stat.enemy;
	if (window.localStorage) {
		if (!localStorage.getItem("highScore") || stat.score > parseInt(localStorage.getItem("highScore"))) {
			document.getElementById("high score").innerHTML = stat.score;
			localStorage.setItem("highScore", stat.score);
		}
		if (!localStorage.getItem("highEnemy") || stat.enemy > parseInt(localStorage.getItem("highEnemy"))) {
			document.getElementById("high enemy").innerHTML = stat.enemy;
			localStorage.setItem("highEnemy", stat.enemy);
		}
	} else {
		if (stat.score > parseInt(document.getElementById("high score").innerHTML)) {
			document.getElementById("high score").innerHTML = stat.score;
		}
		if (stat.enemy > parseInt(document.getElementById("high enemy").innerHTML)) {
			document.getElementById("high enemy").innerHTML = stat.enemy;
		}
	}

	if (pflen > MINLEN) {
		pflen = MAXLEN - stat.score / 100;
	}
	if (tp < MAXTOP) {
		tp = MINTOP + stat.score / 100;
	}

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

	draw();
}