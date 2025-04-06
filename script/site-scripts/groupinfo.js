"use strict";

import musicService from "../database-script/music-group-services.js";

const _service = new musicService(
    `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
);

// const linkString = window.location.href;
// console.log(linkString);

const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
        return searchParams.get(prop);
    },
});

console.log(urlParams.id);

let groupData = [];

let artistData = [];
let albumData = [];

async function getMusicGroupData() {
    // data = await _service.readMusicGroupsAsync(0, true);
    groupData = await _service.readMusicGroupDtoAsync(urlParams.id);
    console.log(groupData);
}

async function getMusicGroupArtists(artistId) {
    artistData = await _service.readArtistDtoAsync(artistId);
    // console.log(artistData);
    // return artistData;
}

async function getMusicGroupAlbums(albumId) {
    // const albumss = await _service.readAlbumsAsync(0, true);

    // console.log(albumss);
    albumData = await _service.readAlbumDtoAsync(albumId);
}

await getMusicGroupData();

(async () => {
    window.onload = showGroupData();

    //Helpers
    async function showGroupData() {
        //Clear first
        // await getMusicGroupData();

        const groupInfo = document.querySelector("#group-info");

        // showGroups
        //creat a row for every quote and append it to _list
        // for (const item of groupData) {
        // const div = createRow();

        // div.classList.add("col-md-12", "themed-grid-col");
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

        // p.classList.add("lead", "fw-bold", "mb-3");
        // div.innerText = item.name + " " + item.establishedYear + " " + item.musicGroupId ;

        // div.appendChild(link);

        groupInfo.appendChild(divHeader);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("row", "col-sm-10");

        await groupArtists();
        await groupAlbums();
        
        groupInfo.appendChild(infoDiv);
        // }

        async function groupArtists() {
            let memberNr = 1;

            const membersInfoDiv = document.createElement("div");
            membersInfoDiv.classList.add("col-sm-6", "mb-3");
            const h2 = document.createElement("h2");
            h2.classList.add("display-6", "fw-light", "text-center");
            h2.innerText = "Members";
            membersInfoDiv.appendChild(h2);
            const membersDiv = document.createElement("div");

            for (const artist of groupData.artistsId) {
                await getMusicGroupArtists(artist);

                if (memberNr % 2 === 0) {
                    const artistsP = document.createElement("p");
                    artistsP.classList.add("theme-even");
                    artistsP.innerText =
                        artistData.firstName + " " + artistData.lastName;
                    membersDiv.appendChild(artistsP);
                } else {
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

        async function groupAlbums() {
            let albumNr = 1;

            const albumsInfoDiv = document.createElement("div");
            albumsInfoDiv.classList.add("col-sm-6", "mb-3");
            const h2 = document.createElement("h2");
            h2.classList.add("display-6", "fw-light", "text-center");
            h2.innerText = "Albums";
            albumsInfoDiv.appendChild(h2);
            const albumsDiv = document.createElement("div");
            for (const album of groupData.albumsId) {
                await getMusicGroupAlbums(album);

                if (albumNr % 2 === 0) {
                    const albumP = document.createElement("p");
                    albumP.classList.add("theme-even");
                    albumP.innerText = albumData.name;
                    albumsDiv.appendChild(albumP);
                } else {
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
