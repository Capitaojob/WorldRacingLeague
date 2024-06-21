function generateValidationNumber(username, raceId) {
	const seed = username + raceId;
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		const character = seed.charCodeAt(i);
		hash = (hash << 5) - hash + character;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

function createTicketImage(username, date, price, validationNumber, raceId, raceName, raceLocation) {
	const canvas = document.getElementById("ticket-canvas");
	const ctx = canvas.getContext("2d");

	// Set canvas size
	canvas.width = 800;
	canvas.height = 250.62;

	// Draw background
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw border
	ctx.strokeStyle = "#000";
	ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

	// Load left side image
	const leftImage = new Image();
	leftImage.src = "../assets/images/ticket_base.png";
	leftImage.crossOrigin = "Anonymous";

	leftImage.onload = function () {
		// Draw left image
		ctx.drawImage(leftImage, 5, 5, 790, canvas.height - 10);

		// Load QR code image
		const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationNumber}`;
		const qrCodeImage = new Image();
		qrCodeImage.crossOrigin = "Anonymous"; // Ensures the image can be used on the canvas

		qrCodeImage.onload = function () {
			// Draw QR code image
			ctx.drawImage(qrCodeImage, canvas.width - 144, canvas.height / 2 - 50, 100, 100); // Adjust the position and size as needed

			// Add text
			ctx.fillStyle = "#000";
			ctx.textAlign = "center";
			ctx.font = "20px Zen Dots";
			ctx.fillText(`Seat ${Math.floor(Math.random() * 300)}`, canvas.width / 2 + 35, 33);
			ctx.font = "20px Zen Dots";
			ctx.fillText(date.toUpperCase(), canvas.width / 2 + 35, 120);
			ctx.font = "30px Zen Dots";
			ctx.fillText(raceName, canvas.width / 2 + 35, 160);
			ctx.font = "20px Zen Dots";
			ctx.fillText(username, canvas.width / 2 + 35, 220);
			ctx.font = "12px Zen Dots";
			ctx.fillText(raceLocation + " - " + price + "€", canvas.width / 2 + 35, canvas.height - 8);

			// Additional info on the right
			ctx.font = "10px Zen Dots";
			ctx.fillText(date.toUpperCase(), canvas.width - 95, 30);
			ctx.fillText(raceName, canvas.width - 95, 50);
			ctx.fillText("#" + validationNumber, canvas.width - 95, canvas.height / 2 + 70);

			// Convert canvas to image
			const dataURL = canvas.toDataURL("image/png");
			const img = new Image();
			img.src = dataURL;

			// Display the image
			const ticketContainer = document.getElementById("ticket-container");
			ticketContainer.innerHTML = "";
			ticketContainer.appendChild(img);

			// Create download link
			const downloadLink = document.getElementById("download-link");
			downloadLink.href = dataURL;
			downloadLink.style.display = "block";
		};

		qrCodeImage.src = qrCodeUrl;
	};
}

// const URLParams = new URLSearchParams(window.location.search);
// const username = URLParams.get("username");
// const date = URLParams.get("date");
// const price = URLParams.get("price");
// const raceId = URLParams.get("raceId");
// const raceName = URLParams.get("raceName");
// const raceLocation = URLParams.get("location");

const username = sessionStorage.getItem("username");
const date = sessionStorage.getItem("date");
const price = sessionStorage.getItem("price");
const raceId = sessionStorage.getItem("raceId");
const raceName = sessionStorage.getItem("raceName");
const raceLocation = sessionStorage.getItem("raceLocation");

const validationNumber = generateValidationNumber(username, raceId);

createTicketImage(username, date, price, validationNumber, raceId, raceName, raceLocation);

// function generateValidationNumber(username, raceId) {
// 	const seed = username + raceId;
// 	let hash = 0;
// 	for (let i = 0; i < seed.length; i++) {
// 		const character = seed.charCodeAt(i);
// 		hash = (hash << 5) - hash + character;
// 		hash |= 0; // Convert to 32bit integer
// 	}
// 	return Math.abs(hash);
// }

// function createTicketImage(username, date, price, validationNumber) {
// 	const canvas = document.getElementById("ticket-canvas");
// 	const ctx = canvas.getContext("2d");

// 	// Set canvas size
// 	canvas.width = 400;
// 	canvas.height = 200;

// 	// Draw background
// 	ctx.fillStyle = "#fff";
// 	ctx.fillRect(0, 0, canvas.width, canvas.height);

// 	// Draw border
// 	ctx.strokeStyle = "#000";
// 	ctx.setLineDash([5, 5]);
// 	ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

// 	// Load QR code image
// 	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationNumber}`;
// 	const qrCodeImage = new Image();
// 	qrCodeImage.crossOrigin = "Anonymous"; // Ensures the image can be used on the canvas

// 	qrCodeImage.onload = function () {
// 		// Draw QR code image
// 		ctx.drawImage(qrCodeImage, 10, 50, 80, 80); // Adjust the position and size as needed

// 		// Add text
// 		ctx.fillStyle = "#000";
// 		ctx.textAlign = "center";
// 		ctx.font = "16px Arial";
// 		ctx.fillText("Ticket", canvas.width / 2, 30);
// 		ctx.fillText(`Username: ${username}`, canvas.width / 2, 50);
// 		ctx.fillText(`Date: ${date}`, canvas.width / 2, 70);
// 		ctx.fillText(`Price: ${price} €`, canvas.width / 2, 90);
// 		ctx.fillText(`Validation #: ${validationNumber}`, canvas.width / 2, 110);

// 		// Convert canvas to image
// 		const dataURL = canvas.toDataURL("image/png");
// 		const img = new Image();
// 		img.src = dataURL;

// 		// Display the image
// 		const ticketContainer = document.getElementById("ticket-container");
// 		ticketContainer.innerHTML = "";
// 		ticketContainer.appendChild(img);

// 		// Create download link
// 		const downloadLink = document.getElementById("download-link");
// 		downloadLink.href = dataURL;
// 		downloadLink.style.display = "block";
// 	};

// 	qrCodeImage.src = qrCodeUrl;
// }

// const URLParams = new URLSearchParams(window.location.search);
// const username = URLParams.get("username");
// const date = URLParams.get("date");
// const price = URLParams.get("price");
// const raceId = URLParams.get("raceId");

// const validationNumber = generateValidationNumber(username, raceId);

// createTicketImage(username, date, price, validationNumber);
