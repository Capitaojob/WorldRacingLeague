let raceInfo = {};

function updateTicketPrice() {
    const selectedDay = document.getElementById("ticket-day").value;
    const quantity = document.getElementById("ticket-quantity").value * 1;
    let price = raceInfo.prices.find((p) => p.day === selectedDay).price;
    const currency = price.slice(-1);
    price = price.slice(0, -1);

    document.getElementById("ticket-price").innerHTML = `Price: <strong>${price * quantity}${currency}</strong>`;
}

function populateRaceDetails(race) {
    document.getElementById("race-track-img").src = race.trackImgUrl;
    document.getElementById("race-title").textContent = `Buy ${race.description} Tickets`;
    document.getElementById("race-description").textContent = race.raceName;
    document.getElementById("race-date").textContent = `${race.date} ${race.month} ${race.season}`;
    document.getElementById("race-location").textContent = race.location;

    const ticketDaySelect = document.getElementById("ticket-day");
    race.prices.forEach((price) => {
        const option = document.createElement("option");
        option.value = price.day;
        option.textContent = price.day;
        ticketDaySelect.appendChild(option);
    });

    ticketDaySelect.addEventListener("change", updateTicketPrice);
    updateTicketPrice();

    const ticketQuantityInput = document.getElementById("ticket-quantity");
    ticketQuantityInput.addEventListener("change", updateTicketPrice);
    updateTicketPrice();
}

document.getElementById("ticket-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("buyer-name").value;
    const quantity = document.getElementById("ticket-quantity").value;
    const price = document.getElementById("ticket-price").innerText.replace(/[^0-9]/g, "");
    const date = document.getElementById("ticket-day").value;
    const raceId = raceInfo.id;
    const raceName = raceInfo.raceName;
    const raceLocation = raceInfo.location;

    sessionStorage.setItem("username", username);
    sessionStorage.setItem("quantity", quantity);
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("price", price);
    sessionStorage.setItem("raceId", raceId);
    sessionStorage.setItem("raceName", raceName);
    sessionStorage.setItem("raceLocation", raceLocation);

    localStorage.setItem("username", username);

    window.location.href = "ticket_download.html";
    // window.location.href = `ticket_download.html?username=${username}&quantity=${quantity}&price=${price}&date=${date}&raceId=${raceInfo.id.toString()}&raceName=${
    // 	raceInfo.raceName
    // }&location=${raceInfo.location}`;
});

let autoFillUsername = localStorage.getItem("username");
if (autoFillUsername !== null) {
    document.getElementById("buyer-name").value = autoFillUsername;
}

// Fetch and display race cards
fetch("../data/schedule.json")
    .then((response) => response.json())
    .then((data) => {
        // Execute Logic
        const raceId = new URLSearchParams(window.location.search).get("race");
        raceInfo = data.find((race) => race.id == raceId);

        if (raceInfo) {
            populateRaceDetails(raceInfo);
        }
    })
    .catch((error) => console.error("Error fetching race data:", error));
