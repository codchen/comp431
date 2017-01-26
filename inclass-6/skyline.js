'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange']

	var buildings = []

	var drawBuilding = function(color, x0, blgWidth, blgHeight) {
		c.fillStyle = color
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random() < 0.7) {
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}
	}

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		buildings[buildings.length] = {
			x: x0,
			y: floor - blgHeight,
			width: blgWidth,
			height: blgHeight,
			color: blgColors[ Math.floor(Math.random()*blgColors.length)]
		}
		drawBuilding(buildings[buildings.length - 1].color, x0, blgWidth, blgHeight)
	}

	var grow = function(building) {
		building.y = building.y - floorSpacing - windowHeight
		building.height = building.height + floorSpacing + windowHeight
		drawBuilding(building.color, building.x, building.width, building.height)
	}

	var sunRadius = 20
	var sunX = sunRadius, sunY = floor - sunRadius
	var sun = function() {
		if (sunY <= floor - sunRadius) {
			c.beginPath()
			c.fillStyle = "orange"
			c.arc(sunX, sunY, sunRadius, 0, 2*Math.PI)
			c.fill()
		}
		sunX = (sunX - sunRadius + 1) % (canvas.width - sunRadius * 2) + sunRadius
		sunY = floor - sunRadius - Math.sqrt((canvas.width / 2 - sunRadius) ** 2 - (canvas.width / 2 - sunX) ** 2)
	}

	var carWidth = 40, carHeight = 30
	var carX = canvas.width - carWidth / 2, carY = floor - carHeight / 2
	var carImg = new Image()
	var car = function() {
		carImg.src = "car.jpg"
		c.drawImage(carImg, carX, carY, carWidth, carHeight)
		carX = carX - 1
		if (carX < carWidth / 2) {
			carX = canvas.width - carWidth / 2
		}
	}

	var draw = function() {
		c.clearRect(0, 0, canvas.width, canvas.height)
		sun()
		buildings.forEach(function(building) {
			drawBuilding(building.color, building.x, building.width, building.height)
		})
		car()
		window.requestAnimationFrame(draw)
	}
	window.requestAnimationFrame(draw)

	return {
		build: build,
		buildings: buildings,
		grow: grow
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	document.querySelector("canvas").onclick = function(e) {
		app.buildings.forEach(function(building) {
			if (e.pageX >= building.x && e.pageX <= building.x + building.width &&
				e.pageY >= building.y && e.pageY <= building.y + building.height) {
				app.grow(building)
			}
		})
	}
}