require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap/dist/css/bootstrap-theme.min.css');
require('./index.css');


function textChangeListener(evt) {
	const id = evt.target.id;
	const text = evt.target.value;

	if (id === "topLineText") {
		window.topLineText = text;
	} else {
		window.bottomLineText = text;
	}

	redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
	// Get Canvas2DContext
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext("2d");

	if (image) {
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	}

	ctx.font = "30pt Impact";
	ctx.textAlign = "center";
	ctx.strokeStyle = 'black';
	ctx.lineWidth = "3";
	ctx.fillStyle = 'white';

	if (topLine) {
		ctx.fillText(topLine, canvas.width / 2, 40);
		ctx.strokeText(topLine, canvas.width / 2, 40);
	}

	if (bottomLine) {
		ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
		ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
	}

}

function saveFile() {
	console.log('save file');

	console.log(document.querySelector('canvas').toDataURL());

	window.open(document.querySelector('canvas').toDataURL());
}


function handleFileSelect(evt) {
	const canvasWidth = 500;
	const canvasHeight = 500;

	const file = evt.target.files[0];

	const reader = new FileReader();

	reader.onload = function(fileObject) {
		const data = fileObject.target.result;

		// Create an image object
		const image = new Image();

		image.onload = function() {
			window.imageSrc = image;
			redrawMeme(window.imageSrc, null, null);
		};

		// Set image data to background image.
		image.src = fileObject.target.result;

	};

	reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";

const input1 = document.getElementById('topLineText');
const input2 = document.getElementById('bottomLineText');

input1.oninput = textChangeListener;
input2.oninput = textChangeListener;

document.getElementById('file').addEventListener('change', handleFileSelect);
document.getElementById('saveBtn').addEventListener('click', saveFile);
