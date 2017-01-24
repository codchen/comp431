// The images used as alternatives
const img_alt = [["img/sample4_l.jpg","img/sample1_l.jpg"],
					["img/sample5_l.jpg","img/sample2_l.jpg"],
					["img/sample_04.jpg","img/sample3_l.jpg"]];

// This function is called upon the loading of main.html
// It changes each img's src on a random interval and also
// sets handlers for the buttons controlling the changes
function onLoadHandler() {
	var imgs = document.getElementsByTagName("img");
	var imgsList = Array.prototype.slice.call(imgs);
	var btns = document.getElementsByTagName("button");
	var btnsList = Array.prototype.slice.call(btns);
	imgsList.forEach(function(img, i) {
		var num = 0;
		var interval = setInterval(function() {
			img.src = img_alt[i][num];
			num = (num + 1) % img_alt[i].length;
		}, Math.floor((Math.random() * 5) + 1) * 1000) ;
		var btn_stopped = false;
		btnsList[i].onclick = function () {
			if (!btn_stopped) {
				clearInterval(interval);
				btnsList[i].innerHTML = "Start";
			} else {
				interval = setInterval(function() {
					img.src = img_alt[i][num];
					num = (num + 1) % img_alt[i].length;
				}, Math.floor((Math.random() * 5) + 1) * 1000);
				btnsList[i].innerHTML = "Stop";
			}
			btn_stopped = !btn_stopped;
		};
	});
}