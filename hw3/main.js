const WIDTH = 500;
const HEIGHT = 700;
const VSCROLL = 1;
const SPEED = 2;

var player = {
	x: 250,
	y: 250,
	radius: 20,
	vx: 0,
	vy: 0
}

var pflen = 100;
var btom = 200;
var tp = 100;

var goodPf = [];
var badPf = [];

window.onload = function() {
	var canvas = document.getElementById("view");
	canvas.setAttribute("width",WIDTH);
	canvas.setAttribute("height",HEIGHT);
	var leftBtn = document.getElementById("left");
	var rightBtn = document.getElementById("right");
	left.addEventListener("mousedown", function() {
		player.vx = -2;
	});
	left.addEventListener("mouseup", function() {
		player.vx = 0;
	});
	right.addEventListener("mousedown", function() {
		player.vx = 2;
	});
	right.addEventListener("mouseup", function() {
		player.vx = 0;
	});

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

	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.arc(player.x,player.y,player.radius,0,2*Math.PI);
	ctx.stroke();

	goodPf.forEach(function(pf) {
		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo(pf.x, pf.y);
		ctx.lineTo(pf.x + pf.len, pf.y);
		ctx.stroke();
	});

	badPf.forEach(function(pf) {
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.moveTo(pf.x, pf.y);
		ctx.lineTo(pf.x + pf.len, pf.y);
		ctx.stroke();
	});

	window.requestAnimationFrame(update);
}

var update = function() {
	var onGood = false;
	goodPf.forEach(function(pf) {
		if (player.x >= pf.x - player.radius / 2 && player.x <= pf.x + player.radius / 2 + pf.len && pf.y === player.y + player.radius) {
			onGood = true;
		}
		pf.y = pf.y - VSCROLL;
	});

	while (goodPf[0].y <= 0) {
		goodPf.shift();
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
	goodPf.forEach(function(pf) {
		if (oldY <= pf.y - player.radius && player.y >= pf.y - player.radius && player.x >= pf.x - player.radius / 2 && player.x <= pf.x + + player.radius / 2 + pf.len) {
			player.y = pf.y - player.radius;
		}
	});

	if (player.y <= player.radius || player.y >= HEIGHT - player.radius) {
		return;
	}

	draw();
}