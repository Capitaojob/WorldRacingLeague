let previousRaceEnded;
let nextRaceIdPlaced;
let isNextRace;

// Function to create a race card
function createRaceCard(race) {
    const card = document.createElement("div");
    card.classList.add("race-card");

    isNextRace = false;

    // Set class for different types of races
    if (
        ((previousRaceEnded === undefined && race.ended === false) || (previousRaceEnded === true && race.ended === false)) &&
        nextRaceIdPlaced === false
    ) {
        card.id = "next-race";
        nextRaceIdPlaced = true;
        isNextRace = true;
    }

    previousRaceEnded = race.ended;

    card.innerHTML = `
            <a href="./pages/buy-tickets.html?race=${race.id}">
                <span class="round">${race.round} ${isNextRace ? "- NEXT RACE" : ""}</span>
                <div class="left-right-container race-info">
                    <div>
                        <h3 class="date">${race.date}</h3>
                        <p class="month">${race.month}</p>
                    </div>
                    <div>
                        <img class="country-flag" src="${race.flagUrl}" alt="Country Flag" />
                    </div>
                </div>
                <hr />
                <div class="details">
                    <h3 class="location">${race.location} <span>»</span></h3>
                    <h4 class="description">${race.description}</h4>
                </div>
                <hr />
                ${
                    race.type === "defined"
                        ? `
                    <div class="race-card-bottom racers">
                        ${race.racers
                            .map(
                                (racer) => `
                            <div class="${racer.position}">
                                <img src="${racer.imgUrl}" alt="${racer.name}" />
                                <h5>${normalizeString(racer.name).substring(0, 3)}</h5>
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                `
                        : race.type === "toCome" //|| race.type === "nextRace"
                        ? `
                    <div class="race-card-bottom track-layout">
                        <img src="${race.trackImgUrl}" alt="Track Layout" />
                    </div>
                `
                        : race.type === "testing"
                        ? `
                    <div class="race-card-bottom testing-image">
                        <img src="${race.testingImgUrl}" alt="Testing Image" />
                    </div>
                `
                        : ""
                }
            </a>`;

    return card;
}

function normalizeString(str) {
    return str.replace(/[^a-zA-Z]/g, "");
}

nextRaceIdPlaced = false;
isNextRace = false;

// Fetch and display race cards
fetch("./data/schedule.json")
    .then((response) => response.json())
    .then((data) => {
        const container = document.getElementById("races");
        data.forEach((race) => {
            const raceCard = createRaceCard(race);
            container.appendChild(raceCard);

            if (isNextRace) {
                const nextElementTeleportElement = document.querySelector(".next-round-card .details");

                nextElementTeleportElement.querySelector("h3").innerText += ` ${race.round}`;
            }
        });
    })
    .catch((error) => console.error("Error fetching race data:", error));
