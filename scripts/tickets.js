let imageArray;

function createRaceCard(race) {
    if (race.ended || race.type === "defined") return;

    const minPrice = race.prices.reduce((min, p) => (p.price < min ? p.price : min), race.prices[0].price);

    const raceCard = document.createElement("div");
    raceCard.className = "race-card";

    raceCard.innerHTML = `
            <img src="${getRandomImage()}" alt="" />
            <div class="bottom-info">
                <img class="country-flag" src="${race.flagUrl}" alt="Country Flag" />
                <h2 class="default-card-title">${race.description}</h2>
            </div>
            <div class="hover-content">
                <div class="information">
                    <h2>${race.description}</h2>
                    <p>${race.raceName} - ${race.location} - ${race.date} ${race.month}</p>
                </div>
                <div class="price">
                    <hr />
                    <h4>from <strong>${minPrice}</strong></h4>
                    <hr />
                </div>
                <div>
                    <button onclick="window.location.href='buy-tickets.html?race=${race.id}'">Book Now</button>
                </div>
            </div>
        `;

    return raceCard;
}

function getRandomImage() {
    return imageArray[Math.floor(Math.random() * imageArray.length)].src;
}

// Fetch images and race data
Promise.all([
    fetch("../data/random_imgs.json").then((response) => response.json()),
    fetch("../data/schedule.json").then((response) => response.json()),
])
    .then(([images, races]) => {
        imageArray = images;

        const container = document.getElementById("races");
        races.forEach((race) => {
            if (!race.ended && race.type !== "defined") {
                const raceCard = createRaceCard(race);
                container.appendChild(raceCard);
            }
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
