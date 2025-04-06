"use strict";

// Import the service class
import musicService from "../database-script/music-group-services.js";

//Initialize the service
const _service = new musicService(
    `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
);

const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
        return searchParams.get(prop);
    },
});

// Default values
let groupData = [];

// Gets the music groups data from the service
async function getMusicGroupData() {
    groupData = await _service.readMusicGroupAsync(urlParams.id, false);
}

// async functions
(async () => {
    // Present the music group data on the page
    async function showGroupData() {
        // Runs the get music group data function
        await getMusicGroupData();
        // await getMusicGroupGenres();
        // Gets the main div element
        const groupInfo = document.querySelector("#group-info");

        // Creates the music group header div and adds the music group name, established year, and genre
        const divHeader = document.createElement("div");
        divHeader.classList.add("col-sm-12");
        const h1 = document.createElement("h1");
        h1.classList.add("display-5", "fw-medium", "mb-3", "text-center");
        h1.innerText = groupData.name;
        divHeader.appendChild(h1);

        const pY = document.createElement("p");
        pY.classList.add("fs-4", "mb-3", "text-center");
        pY.innerText = `Established: ${groupData.establishedYear}`;
        divHeader.appendChild(pY);

        const pG = document.createElement("p");
        pG.classList.add("fs-4", "mb-3", "text-center");
        pG.innerText = `Genre: ${groupData.strGenre}`;
        divHeader.appendChild(pG);

        groupInfo.appendChild(divHeader);

        // Div for the music group members and albums
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("row", "col-sm-10");

        // Get and presents the music group members and albums in two columns (on larger screens)
        await groupArtists();
        await groupAlbums();

        groupInfo.appendChild(infoDiv);

        // Creates the music group members div/list
        async function groupArtists() {
            // Default div number
            // Changes the background color of the list item div
            let memberNr = 1;

            // Music group members div
            const membersInfoDiv = document.createElement("div");
            membersInfoDiv.classList.add("col-sm-6", "mb-3");
            const h2 = document.createElement("h2");
            h2.classList.add("display-6", "fw-light", "text-center");
            h2.innerText = "Members";
            membersInfoDiv.appendChild(h2);

            const membersDiv = document.createElement("div");

            // Fetch artist data from groupData
            const artists = groupData.artists;
            // Loop through the music group members and add them to the members div
            for (const artist of artists) {
                const artistP = document.createElement("p");
                // If the listDivNr is even, add theme-even, else add theme-odd
                artistP.classList.add(
                    memberNr % 2 === 0 ? "theme-even" : "theme-odd"
                );
                artistP.innerText = `${artist.firstName} ${artist.lastName}`;
                membersDiv.appendChild(artistP);
                memberNr++;
            }

            membersInfoDiv.appendChild(membersDiv);
            infoDiv.appendChild(membersInfoDiv);
        }

        // Creates the music group albums div/list
        async function groupAlbums() {
            // Default div number
            // Changes the background color of the list item div
            let albumNr = 1;

            // Music group albums div
            const albumsInfoDiv = document.createElement("div");
            albumsInfoDiv.classList.add("col-sm-6", "mb-3");
            const h2 = document.createElement("h2");
            h2.classList.add("display-6", "fw-light", "text-center");
            h2.innerText = "Albums";
            albumsInfoDiv.appendChild(h2);

            const albumsDiv = document.createElement("div");

            // Fetch album data from groupData
            const albums = groupData.albums;

            // Loop through the music group albums and add them to the members div
            for (const album of albums) {
                const albumP = document.createElement("p");
                // If the listDivNr is even, add theme-even, else add theme-odd
                albumP.classList.add(
                    albumNr % 2 === 0 ? "theme-even" : "theme-odd"
                );
                albumP.innerText = album.name;
                albumsDiv.appendChild(albumP);
                albumNr++;
            }

            albumsInfoDiv.appendChild(albumsDiv);
            infoDiv.appendChild(albumsInfoDiv);
        }
    }

    // Show the music group data on load
    await showGroupData();
})();
