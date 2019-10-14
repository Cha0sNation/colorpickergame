var colors = [];
var pickedColor;
var numSquares = 6;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var gameStatus = document.querySelector("#status");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");
var container = document.querySelector("#container");

init();





function init() {
	squaresListener();
	btnsListener();
	reset();
}
function squaresListener() {
	for (var x = 0; x < squares.length; x++) {
		//squares event listener
		squares[x].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if(pickedColor === clickedColor) {
				//change colors to correct color
				gameStatus.textContent = "Correct !";
				changeColors(pickedColor);
				h1.style.background = pickedColor;
				resetBtn.textContent = "PLAY AGAIN ?";
			} else {
				gameStatus.textContent = "Incorrect !";
				this.style.background = "#232323";
			}
		});
	}
}
function btnsListener() {
	resetBtn.addEventListener("click", function() {
		reset();
	});
	for (var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}
function reset() {
	//generate new colors
	colors = colorGen(numSquares);
	//pick correct color
	pickedColor = pickColor();
	//update colorDisplay to show pickedColor
	colorDisplay.textContent = pickedColor;
	//reset resetBtn textContent
	resetBtn.textContent = "NEW COLORS";
	//reset h1 color
	h1.style.background = "steelblue";
	//reset gameStatus
	gameStatus.textContent = "";
	//reset square colors
	for (var x = 0; x < squares.length; x++) {
		if (colors[x]) {
			squares[x].style.backgroundColor = colors[x];
			container.style["padding-top"] = "0px";
			squares[x].style.display = "inline-box";
		} else {
			squares[x].style.display = "none";
			container.style["padding-top"] = "100px";
		}
	}
}
function pickColor(){
	//pick correct color
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function colorGen(num) {
	//generate num colors and return
	var arr = [];
	for (var x = 0; x < num; x++) {
		arr.push(generateColor());
	}
	return arr;
}
function generateColor() {
	//generate rgb color
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
function changeColors(color) {
	for (var x = 0; x < squares.length; x++) {
		squares[x].style.background = color;
	}
}