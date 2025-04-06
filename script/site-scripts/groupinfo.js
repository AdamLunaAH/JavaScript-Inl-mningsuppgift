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
let artistData = [];
let albumData = [];

// Gets the music groups data from the service
async function getMusicGroupData() {
    groupData = await _service.readMusicGroupDtoAsync(urlParams.id);
    // console.log(groupData);
}

// Gets the music group artist data from the service
async function getMusicGroupArtists(artistId) {
    artistData = await _service.readArtistDtoAsync(artistId);
}

// Gets the music group album data from the service
async function getMusicGroupAlbums(albumId) {
    albumData = await _service.readAlbumDtoAsync(albumId);
}

// Runs the get music group data function
await getMusicGroupData();

// async functions
(async () => {
    // On load event, run the show the music group data function
    window.onload = showGroupData();

    // Present the music group data on the page
    async function showGroupData() {
        // Gets the main div element
        const groupInfo = document.querySelector("#group-info");

        // Creates the music group header div and adds the music group name and established year
        const divHeader = document.createElement("div");
        divHeader.classList.add("col-sm-12");
        const h1 = document.createElement("h1");
        h1.classList.add("display-5", "fw-medium", "mb-3", "text-center");
        h1.innerText = groupData.name;
        divHeader.appendChild(h1);

        const p = document.createElement("p");
        p.classList.add("fs-4", "mb-3", "text-center");
        p.innerText = `Established: ${groupData.establishedYear}`;
        divHeader.appendChild(p);

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

            // Loop through the music group members and get their data
            // and add them to the members div
            for (const artist of groupData.artistsId) {
                await getMusicGroupArtists(artist);
                // If the listDivNr is even, add theme-even
                if (memberNr % 2 === 0) {
                    const artistsP = document.createElement("p");
                    artistsP.classList.add("theme-even");
                    artistsP.innerText =
                        artistData.firstName + " " + artistData.lastName;
                    membersDiv.appendChild(artistsP);
                }
                // If the listDivNr is odd, add theme-odd
                else {
                    const artistsP = document.createElement("p");
                    artistsP.classList.add("theme-odd");
                    artistsP.innerText =
                        artistData.firstName + " " + artistData.lastName;
                    membersDiv.appendChild(artistsP);
                }
                memberNr++;
                membersInfoDiv.appendChild(membersDiv);
            }
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

            // Loop through the music group albums and get their data
            // and add them to the members div
            for (const album of groupData.albumsId) {
                await getMusicGroupAlbums(album);
                // If the listDivNr is even, add theme-even
                if (albumNr % 2 === 0) {
                    const albumP = document.createElement("p");
                    albumP.classList.add("theme-even");
                    albumP.innerText = albumData.name;
                    albumsDiv.appendChild(albumP);
                }
                // If the listDivNr is odd, add theme-odd
                else {
                    const albumP = document.createElement("p");
                    albumP.classList.add("theme-odd");
                    albumP.innerText = albumData.name;
                    albumsDiv.appendChild(albumP);
                }
                albumNr++;
                albumsInfoDiv.appendChild(albumsDiv);
            }
            infoDiv.appendChild(albumsInfoDiv);
        }
    }
})();
