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

function createTicketImage(username, date, price, validationNumber) {
    const canvas = document.getElementById("ticket-canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Draw background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = "#000";
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Add text
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "16px Arial";
    ctx.fillText("Ticket", canvas.width / 2, 40);
    ctx.fillText(`Username: ${username}`, canvas.width / 2, 80);
    ctx.fillText(`Date: ${date}`, canvas.width / 2, 110);
    ctx.fillText(`Price: ${price} €`, canvas.width / 2, 140);
    ctx.fillText(`Validation #: ${validationNumber}`, canvas.width / 2, 170);

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
}

const URLParams = new URLSearchParams(window.location.search);
const username = URLParams.get("username");
const date = URLParams.get("date");
const price = URLParams.get("price");
const raceId = URLParams.get("raceId");

const validationNumber = generateValidationNumber(username, raceId);

createTicketImage(username, date, price, validationNumber);
